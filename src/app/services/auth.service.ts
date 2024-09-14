import { inject, Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;
  private _ngZone = inject(NgZone);
  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseurl,
      environment.supabaseKey
    );
    this.supabase.auth.onAuthStateChange((events, session) => {
      localStorage.setItem('session', JSON.stringify(session?.user));
      if (session?.user) {
        this._ngZone.run(() => {
          this.router.navigate(['/chat']);
        });
      }
    });
  }
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true;
  }
  async SigninGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  async SignOut() {
    await this.supabase.auth.signOut();
    // the above will clear the localstorage as well as sessionstorage from the users browser
  }
}
// now we can use the above service in our entire application where we need a supabase client
