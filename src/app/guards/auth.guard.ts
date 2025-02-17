import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  exp: number;
  roles?: string[];
}

/**
 * @function authGuard
 * @description Überprüft, ob der Benutzer authentifiziert ist.
 * Falls das Token abgelaufen oder nicht vorhanden ist, wird zur Login-Seite weitergeleitet.
 * Es wird keine spezifische Admin-Prüfung durchgeführt, da alle authentifizierten Benutzer Zugriff haben.
 * @param route Die aktuelle Route, die aufgerufen wird.
 * @param state Der aktuelle RouterStateSnapshot.
 * @returns `true`, wenn der Benutzer Zugriff hat, sonst `false` (Umleitung zur Login-Seite).
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (!token) {
    console.warn('Kein Token gefunden, Umleitung zur Login-Seite.');
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      console.warn('Token abgelaufen, Umleitung zur Login-Seite.');
      localStorage.removeItem('ACCESS_TOKEN');
      router.navigate(['/login']);
      return false;
    }

    // todo falls Admin-bereich implementiert wird hier noch ergänzen

    return true;
  } catch (error) {
    console.error('Fehler beim Dekodieren des Tokens:', error);
    localStorage.removeItem('ACCESS_TOKEN');
    router.navigate(['/auth/login']);
    return false;
  }
};
