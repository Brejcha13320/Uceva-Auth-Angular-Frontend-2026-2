import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../../../features/auth/services/auth/auth.service';
import { User } from '../../../../features/auth/interfaces/user.interface';

@Component({
  selector: 'app-dashboard.component',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  protected $user = signal<User | null>(null);
  private readonly authService = inject(AuthService);

  ngOnInit(){
    const user = this.authService.getUser();
    if(user) this.$user.set(user);
  }

}
