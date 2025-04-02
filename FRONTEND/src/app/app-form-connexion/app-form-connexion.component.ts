import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormModaleMdpoublieComponent } from '../app-form-modale-mdpoublie/app-form-modale-mdpoublie.component';

@Component({
  standalone: true,
  selector: 'app-form-connexion',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app-form-connexion.component.html',
  styleUrls: ['./app-form-connexion.component.css']
})




export class AppFormConnexionComponent implements OnInit {
  // ... (autres propriétés existantes)
  errorMessage: string = '';
  isLoading: boolean = false;
  loginForm: any;
  passwordRequirements: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]]
    });
  }

  ngOnInit() {
    this.http.get('http://localhost:8081/login').subscribe({
      next: (response: any) => {
        this.passwordRequirements = response.passwordRequirements;
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
        // Valeurs par défaut si le serveur ne répond pas
        this.passwordRequirements = {
          minLength: 8,
          needsUpper: true,
          needsNumber: true
        };
      }
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.http.post('http://localhost:8081/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/accueil']); // Navigation propre
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.error?.error || 'Erreur de connexion';
            console.error('Erreur de connexion:', err);
          },
          complete: () => this.isLoading = false
        });
    }
  }
  
  // ... (autres méthodes existantes)
}







// export class AppFormConnexionComponent  {
//   isModalVisible: boolean = false; // Contrôle de la visibilité de la modale
//   username: string = '';
//   password: string = '';
//   email: string = '';
//   loginForm: FormGroup;
//   showPasswordModal = false;
  
//   constructor(private fb: FormBuilder) {
//     // Initialisation du formulaire
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
// }


//   // Ouvrir la modale
//   openModal(event: Event): void {
//     event.preventDefault();
//     this.isModalVisible = true;
//   }
  
//   // Fermer la modale
//   closeModal(event: Event): void {
//     if (event.target === event.currentTarget) {
//       this.isModalVisible = false;
//     }
//   }
  
//   // Soumettre le formulaire de connexion
//   onLoginSubmit(): void {
//     console.log('Nom d\'utilisateur:', this.username);
//     console.log('Mot de passe:', this.password);
//   }
  
//   onSubmit() {
//     if (this.loginForm.valid) {
//       // Logique de connexion
//       console.log('Form submitted', this.loginForm.value);
//     }
//   }
  
//   // Envoyer un mail de réinitialisation de mot de passe
//   sendResetEmail(): void {
//     console.log('Réinitialisation de mot de passe pour:', this.email);
//     this.isModalVisible = false; // Fermer la modale après l'envoi du mail
//   }
  
//   // Méthode pour fermer la modale de réinitialisation de mot de passe
//   closePasswordModal() {
//     this.showPasswordModal = false;
//   }
  
//   // Méthode pour ouvrir la modale de réinitialisation de mot de passe
//   openPasswordModal() {
//     this.showPasswordModal = true;
//   }
// }
