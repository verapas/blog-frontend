import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {CookieService} from 'ngx-cookie-service';

interface JwtPayload {
  exp: number;
  roles?: string[];
}

/**
 * @function authGuard
 * @description Überprüft, ob der Benutzer authentifiziert ist und,
 * falls in der Route erlaubte Rollen definiert sind (data.role),
 * ob der Benutzer mindestens eine dieser Rollen besitzt.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.get('JOURNALIX_ACCESS_TOKEN'); // Token aus dem Cookie lesen

  if (!token) {
    console.warn('Kein Token gefunden, Umleitung zur Login-Seite.');
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      console.warn('Token abgelaufen, Umleitung zur Login-Seite.');
      cookieService.delete('JOURNALIX_ACCESS_TOKEN', '/'); // Cookie löschen
      router.navigate(['/auth/login']);
      return false;
    }

    // Falls in der Route erlaubte Rollen definiert sind:
    if (route.data && route.data?.['role']) {
      const allowedRoles = route.data['role'] as string[];
      const userRoles = decoded.roles || [];
      const hasRole = allowedRoles.some(role => userRoles.includes(role));

      if (!hasRole) {
        console.warn('Benutzer hat nicht die erforderliche Rolle.');
        router.navigate(['/unauthorized']); // Seite "Zugriff verweigert"
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Fehler beim Dekodieren des Tokens:', error);
    cookieService.delete('JOURNALIX_ACCESS_TOKEN', '/');
    router.navigate(['/auth/login']);
    return false;
  }
};
