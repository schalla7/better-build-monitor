import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LogoutComponent>,
  ) { }
  
  onLogout(): void {
      this.authService.logout().subscribe({
        next: () => {
            // This part is optional for logout but can be useful for debugging
            console.log('Logout successful');
        },
        error: (error) => {
            // Handle any errors here
            console.error('Logout error', error);
        },
        complete: () => {
            this.dialogRef.close();
            console.log('Modal should close now');
        }
    });
  }
}
