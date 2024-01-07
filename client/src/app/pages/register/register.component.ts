import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterPayload } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	email: string = '';
	username: string = '';
	password: string = '';
	confirmPassword: string = '';
  
	constructor(private authService: AuthService, private router: Router) {}
	
	register(): void {
	  const payload: RegisterPayload = {
			email: this.email,
			username: this.username,
			password: this.password,
			confirmPassword: this.confirmPassword
	  };
	  
	  this.authService.register(payload).subscribe({
			next: (response) => {
				console.log(response);
				localStorage.setItem('authToken', response.token);
				this.router.navigateByUrl('/feed');
			},
			error: (error) => {
				console.error(error);
			}
	  });
	}
}
