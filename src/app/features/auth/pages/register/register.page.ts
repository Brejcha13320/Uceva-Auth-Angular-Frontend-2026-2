import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../core/validators/password-match/password-math.validator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterUser } from '../../interfaces/register.interface';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-register.page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage {

  registerForm!: FormGroup;

  // Signals
  showPassword = signal(false);
  showRepeatPassword = signal(false);
  isLoading = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa el formulario de registro.
   */
  private initForm(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required]
      },
      { validators: passwordMatchValidator }
    );
  }

  /**
   * Obtiene los controles del formulario.
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Alterna la visibilidad de la contraseña.
   */
  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  /**
   * Alterna la visibilidad de la confirmación de contraseña.
   */
  toggleRepeatPassword(): void {
    this.showRepeatPassword.update(value => !value);
  }

  /**
   * Procesa el registro del usuario.
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { fullName, email, password, role } = this.registerForm.value;
    const registerUser: RegisterUser = {
      nombre: fullName,
      rol: role,
      password,
      email,
    }
    this.isLoading.set(true);
    this.authService.register(registerUser).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/auth/login');
        this.alertService.toast('Usuario creado exitosamente', 'success');
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
        this.alertService.toast('Error al registrar el usuario', 'error');
      }
    })
    // TODO: Integrar AuthService con el backend.
    console.log('Registrar usuario:', {
      fullName,
      email,
      password
    });
  }

}
