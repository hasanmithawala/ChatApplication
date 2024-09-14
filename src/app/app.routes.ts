import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./pages/login/login.component').then((m) => m.LoginComponent),
  // },
];
