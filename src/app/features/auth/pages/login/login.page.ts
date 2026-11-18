import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-login.page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {

  loginForm!: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly storageService = inject(StorageService);

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa el formulario de inicio de sesión.
   */
  private initForm(): void {
    const rememberedEmail = this.storageService.getItem<string>('rememberedEmail');

    this.loginForm = this.fb.group({
      email: [rememberedEmail ?? '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberEmail: [rememberedEmail !== null]
    });
  }

  /**
   * Obtiene los controles del formulario.
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Alterna la visibilidad de la contraseña.
   */
  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  /**
   * Procesa el inicio de sesión.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password, rememberEmail } = this.loginForm.value;
    this.manageRememberedEmail(email, rememberEmail);
    this.isLoading.set(true);
    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
        this.alertService.toast('Error al iniciar sesión', 'error');
      }
    });
  }

  /**
   * Administra el almacenamiento del correo.
   */
  private manageRememberedEmail(email: string, remember: boolean): void {
    if (remember) {
      this.storageService.saveItem('rememberedEmail', email);
    } else {
      this.storageService.removeItem('rememberedEmail');
    }
  }

}
