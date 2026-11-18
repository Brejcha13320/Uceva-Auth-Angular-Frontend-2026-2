import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../../core/validators/password-match/password-math.validator';

@Component({
  selector: 'app-reset-password.page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.scss',
})
export class ResetPasswordPage {

  resetPasswordForm!: FormGroup;

  token = signal<string | null>(null);
  isLoading = signal(false);
  passwordChanged = signal(false);
  showPassword = signal(false);
  showRepeatPassword = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.token.set(
      this.route.snapshot.queryParamMap.get('token')
    );
    this.initForm();
  }

  private initForm(): void {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required]
      },
      { validators: passwordMatchValidator }
    );
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  toggleRepeatPassword(): void {
    this.showRepeatPassword.update(value => !value);
  }

  onSubmit(): void {
    if (!this.token()) {
      return;
    }

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const { password } = this.resetPasswordForm.value;

    const request = {
      token: this.token(),
      password
    };

    this.isLoading.set(true);
    // TODO: Integrar AuthService con el backend.
    console.log('Solicitud de cambio de contraseña:', {
      tokenReceived: !!request.token,
      passwordProvided: !!request.password
    });
  }

}
