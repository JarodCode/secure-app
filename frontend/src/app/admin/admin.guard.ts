import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../shared/auth/auth.service'

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  // Vérifie si l'utilisateur est admin
  if (authService.isAdmin()) {
    return true
  }

  // Si connecté mais pas admin, redirige vers home
  if (authService.isLoggedIn()) {
    console.warn('🚫 Accès refusé - Privilèges admin requis')
    return router.createUrlTree(['/home'])
  }

  // Sinon redirige vers login
  console.warn('🚫 Non connecté - Redirection vers /login')
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  })
}