import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AuthService } from './shared/auth/auth.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly authService = inject(AuthService)

  ngOnInit() {
    // Vérifie la session au démarrage
    this.authService.whoami()
  }

  logout() {
    this.authService.logout()
  }
}