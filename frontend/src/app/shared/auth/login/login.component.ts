import { Component, inject, effect } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  readonly isLoading = this.authService.isLoading
  readonly error = this.authService.error
  readonly currentUser = this.authService.currentUser

  constructor() {
  effect(() => {
    if (this.currentUser()) {
      console.log('✅ Connexion réussie, redirection vers /home')
      this.router.navigate(['/home'])
    }
  })
}

  onSubmit() {
    if (this.loginForm.invalid) return
    
    const { login, password } = this.loginForm.value
    this.authService.login(login, password)
  }
}
