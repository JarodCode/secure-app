import { Injectable, inject, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { catchError, finalize, tap, of } from 'rxjs'
import { UserDto } from '../types/user-dto'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient)

  // --- État interne (signaux) ---
  private readonly _users = signal<UserDto[]>([])
  private readonly _isLoading = signal(false)
  private readonly _error = signal<string | null>(null)

  // --- État exposé (readonly) ---
  readonly users = this._users.asReadonly()
  readonly isLoading = this._isLoading.asReadonly()
  readonly error = this._error.asReadonly()

  // --- Récupérer tous les utilisateurs (admin only) ---
  loadAll() {
    this._isLoading.set(true)
    this._error.set(null)

    this.http.get<UserDto[]>(`${environment.apiUrl}/users`, { withCredentials: true })
      .pipe(
        tap(users => {
          this._users.set(users)
          console.log(`✅ ${users.length} utilisateurs récupérés`)
        }),
        catchError(err => {
          console.error('❌ Erreur lors de la récupération des utilisateurs', err)
          if (err.status === 403) {
            this._error.set('Accès réservé aux administrateurs')
          } else {
            this._error.set('Impossible de charger les utilisateurs')
          }
          this._users.set([])
          return of([])
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe()
  }

  // --- Récupérer le profil de l'utilisateur connecté ---
  getMe() {
    this._isLoading.set(true)
    this._error.set(null)

    return this.http.get<UserDto>(`${environment.apiUrl}/users/me`, { withCredentials: true })
      .pipe(
        tap(user => console.log('✅ Profil récupéré:', user)),
        catchError(err => {
          console.error('❌ Erreur lors de la récupération du profil', err)
          this._error.set('Impossible de charger le profil')
          return of(null)
        }),
        finalize(() => this._isLoading.set(false))
      )
  }

  // --- Récupérer un utilisateur par ID ---
  getById(id: string | number) {
    this._isLoading.set(true)
    this._error.set(null)

    return this.http.get<UserDto>(`${environment.apiUrl}/users/${id}`, { withCredentials: true })
      .pipe(
        tap(user => console.log(`✅ Utilisateur ${id} récupéré:`, user)),
        catchError(err => {
          console.error(`❌ Erreur lors de la récupération de l'utilisateur ${id}`, err)
          if (err.status === 404) {
            this._error.set('Utilisateur introuvable')
          } else {
            this._error.set('Erreur lors de la récupération')
          }
          return of(null)
        }),
        finalize(() => this._isLoading.set(false))
      )
  }

  // --- Créer un utilisateur ---
  create(login: string, password: string) {
    this._isLoading.set(true)
    this._error.set(null)

    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/users`,
      { login, password },
      { withCredentials: true }
    ).pipe(
      tap(response => {
        console.log('✅ Utilisateur créé:', response.message)
        // Recharger la liste après création
        this.loadAll()
      }),
      catchError(err => {
        console.error('❌ Erreur lors de la création', err)
        if (err.status === 400) {
          this._error.set('Login et mot de passe requis')
        } else if (err.status === 409) {
          this._error.set('Login déjà existant')
        } else {
          this._error.set('Impossible de créer l\'utilisateur')
        }
        return of(null)
      }),
      finalize(() => this._isLoading.set(false))
    )
  }
}
