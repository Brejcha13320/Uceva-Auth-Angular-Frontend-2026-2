import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../features/auth/interfaces/user.interface';
import { AuthService } from '../../../../features/auth/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  private readonly authService = inject(AuthService);

  $user = input.required<User>({ alias: 'user' });

  showUserMenu = signal(false);

  toggleUserMenu(): void {
    this.showUserMenu.update(value => !value);
  }

  closeUserMenu(): void {
    this.showUserMenu.set(false);
  }

  getInitials(name: string): string {
    return name.substring(0, 2).toUpperCase();
  }

  logout(): void {
    this.closeUserMenu();
    this.authService.logout();
  }

}
