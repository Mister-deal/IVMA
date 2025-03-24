import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormModaleMdpoublieComponent } from '../app-form-modale-mdpoublie/app-form-modale-mdpoublie.component';
@Component({
  standalone: true,
  selector: 'app-form-modale-mdpoublie',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule, // Ajout du ReactiveFormsModule manquant
    FormModaleMdpoublieComponent 
  ],
  templateUrl: './app-form-connexion.component.html',
  styleUrl: './app-form-connexion.component.css'
})
export class AppFormConnexionComponent  {
  isModalVisible: boolean = false; // Contrôle de la visibilité de la modale
  username: string = '';
  password: string = '';
  email: string = '';
  loginForm: FormGroup;
  showPasswordModal = false;
  
  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
}


  // Ouvrir la modale
  openModal(event: Event): void {
    event.preventDefault();
    this.isModalVisible = true;
  }
  
  // Fermer la modale
  closeModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.isModalVisible = false;
    }
  }
  
  // Soumettre le formulaire de connexion
  onLoginSubmit(): void {
    console.log('Nom d\'utilisateur:', this.username);
    console.log('Mot de passe:', this.password);
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      // Logique de connexion
      console.log('Form submitted', this.loginForm.value);
    }
  }
  
  // Envoyer un mail de réinitialisation de mot de passe
  sendResetEmail(): void {
    console.log('Réinitialisation de mot de passe pour:', this.email);
    this.isModalVisible = false; // Fermer la modale après l'envoi du mail
  }
  
  // Méthode pour fermer la modale de réinitialisation de mot de passe
  closePasswordModal() {
    this.showPasswordModal = false;
  }
  
  // Méthode pour ouvrir la modale de réinitialisation de mot de passe
  openPasswordModal() {
    this.showPasswordModal = true;
  }
}
