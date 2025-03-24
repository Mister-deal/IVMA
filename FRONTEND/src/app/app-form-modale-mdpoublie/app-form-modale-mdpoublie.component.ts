import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-mdp-oublie',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app-form-modale-mdpoublie.component.html',
  styleUrls: ['./app-form-modale-mdpoublie.component.css']
})
export class FormModaleMdpoublieComponent {
  @Output() close = new EventEmitter<void>();
  email: string = '';

  onSubmit() {
    console.log('Email envoyé à:', this.email);
    this.close.emit();
  }
}