import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import the missing module
import { MatInputModule } from '@angular/material/input'; // Import the missing module
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../store/user/user.interface';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent implements OnInit {

  loginForm!: FormGroup;
  loginError: string | null = null;

  
  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private dialogRef: MatDialogRef<LoginModalComponent>) { } // Inject the AuthService
  
  

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.emailInput.nativeElement.focus(), 0);
  }

  onSubmit(): void {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (user: IUser) => {
        console.log('Login successful', user.username);
        // Close the modal here, if applicable
        this.dialogRef.close(); 
      },
      error: (error) => {
        console.error('Login failed', error.message);
        this.loginError = 'Invalid credentials provided. Please try again.';
        // Show an error message
        // This could be setting an error message in a variable and displaying it in the template
      }
    });
  }
}

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // Open the forgot password modal
  }
}
