import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  standalone: false,
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSignup() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.presentToast('Please enter a valid email address.');
      return;
    }

    if (this.password.length < 4) {
      this.presentToast('Password must be at least 4 characters long.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Passwords do not match.');
      return;
    }

    const success = await this.authService.signup(this.email, this.password);
    if (success) {
      const toast = await this.toastController.create({
        message: 'Signup successful!',
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['/login']);
    } else {
      this.presentToast('User already exists.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger',
      buttons: [
        {
          text: '✖',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
}
