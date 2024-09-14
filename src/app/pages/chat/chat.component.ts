import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';
import { Ichat } from '../../interface/chats-response';
import { CommonModule, DatePipe } from '@angular/common';
import { DeleteModalComponent } from '../../layout/delete-modal/delete-modal.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CommonModule, DeleteModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private chat = inject(ChatService);
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);
  chats = signal<Ichat[]>([]);
  constructor() {
    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required],
    });
    // effect(() => {
    //   this.onListChat();
    // });
    effect(() => {
      // This will run whenever `chats` changes
      const chatMessages = this.chats();
      if (chatMessages.length === 0) {
        console.log('No chat messages found.');
      } else {
        console.log('Chat messages updated:', chatMessages);
      }
    });
  }
  ngOnInit(): void {
    this.onListChat();
  }

  async Logout() {
    this.auth
      .SignOut()
      .then(() => {
        this.router.navigateByUrl('/login');
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  async onSubmit() {
    const formValue = this.chatForm.value.chatMessage;
    if (!formValue) {
      alert('Please enter some message');
      return;
    }
    try {
      const res = await this.chat.chatmessages(formValue);
      this.chatForm.reset();
      await this.onListChat();
    } catch (err: any) {
      alert(err.message);
    }
  }
  async onListChat() {
    try {
      const res: any = await this.chat.listChat();
      this.chats.set(res);
      // the above is used to set a new value to our varaiable
    } catch (err: any) {
      alert(err.message);
    }
  }
  openDropdown(msg: Ichat) {
    this.chat.selectedChats(msg);
  }
}
