import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService) {
    // constructor body
  }
  async handleAuth() {
    const response = await this.auth.signInWithGoogle();
    console.log(response);
  }
}
