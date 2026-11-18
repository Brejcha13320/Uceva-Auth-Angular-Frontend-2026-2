import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Valida que la contraseña y su confirmación sean iguales.
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  if (!password || !repeatPassword) {
    return null;
  }

  return password === repeatPassword
    ? null
    : { passwordMismatch: true };
};