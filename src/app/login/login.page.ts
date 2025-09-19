import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController} from '@ionic/angular'; 
import { FormBuilder, FormGroup,Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
   }

   async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).then(async (result) => {
        if (result) {
          this.navCtrl.navigateRoot('/tabs');
        } else {
          await this.presentToast('Invalid email or password');
        }
      });
    } else {
      await this.presentToast('Please fill in all fields correctly.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger', // red styling for error
      buttons: [
        {
          text: '✖',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
  
  
  goToRegister() {
    this.navCtrl.navigateForward('/signup');
  }
}
