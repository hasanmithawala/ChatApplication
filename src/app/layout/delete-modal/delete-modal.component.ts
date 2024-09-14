import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../supabase/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  private chat_service = inject(ChatService);
  private router = inject(Router);
  dismiss = signal(false);
  constructor() {
    effect(() => {
      console.log(this.chat_service.savedchat());
    });
  }
  DeleteChat() {
    const id = (this.chat_service.savedchat() as { id: string }).id;
    this.chat_service
      .deleteChats(id)
      .then(() => {
        this.dismiss.set(true);
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
