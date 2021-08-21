// eslint-disable-next-line import/no-cycle
import { authInstance } from '../auth';

export default async function checkAccess(to, from, next) {
  if (!authInstance.ready) {
    await authInstance.init();
  }

  const isUserLoggedIn = Boolean(authInstance.token);
  const isUserAdmin = Boolean(authInstance.isAdmin);

  const isRouteGuest = to.meta.guest;
  const isRouteAdmin = to.meta.admin;

  if (isRouteGuest && !isUserLoggedIn) {
    next();
  }

  if (isRouteGuest && isUserLoggedIn) {
    next({ name: 'home' });
  }

  if (!isRouteGuest && isUserLoggedIn) {
    if (isRouteAdmin) {
      if (isUserAdmin) {
        next();
      }
    } else {
      next();
    }
  }

  if (!isRouteGuest && !isUserLoggedIn) {
    next({ name: 'login' });
  }
}
