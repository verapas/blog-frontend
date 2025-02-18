import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  exp: number;
  roles?: string[];
}
/**
 * @function authGuard
 * @description Überprüft, ob der Benutzer authentifiziert ist und,
 * falls in der Route erlaubte Rollen definiert sind (data.roles),
 * ob der Benutzer mindestens eine dieser Rollen besitzt.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('ACCESS_TOKEN');

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
      localStorage.removeItem('ACCESS_TOKEN');
      router.navigate(['/auth/login']);
      return false;
    }

    // Falls in der Route erlaubte Rollen definiert sind:
    if (route.data && route.data?.['role']) {
      const allowedRoles = route.data?.['role'] as string[];
      const userRoles = decoded.roles || [];
      const hasRole = allowedRoles.some(role => userRoles.includes(role));

      if (!hasRole) {
        console.warn('Benutzer hat nicht die erforderliche Rolle.');
        router.navigate(['/unauthorized']); // Eine Option: Zeige eine Seite "Zugriff verweigert" an
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Fehler beim Dekodieren des Tokens:', error);
    localStorage.removeItem('ACCESS_TOKEN');
    router.navigate(['/auth/login']);
    return false;
  }
};
