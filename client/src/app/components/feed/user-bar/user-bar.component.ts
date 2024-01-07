import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent {
	@Input() user!: UserInterface;
	
	isFollowing: boolean = true;

	constructor(private router: Router) {}

	navigateToProfile(username: string) {
	  	this.router.navigate(['/profile/', username]);
	}
}
