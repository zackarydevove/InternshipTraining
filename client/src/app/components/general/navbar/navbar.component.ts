import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/service/darkmode/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	searchTerm: string = '';
	showDropdown: boolean = false;
	users: any[] = [];
  
	constructor(
		private router: Router,
		protected darkModeService: DarkModeService
	) {}
  
	navigate(path: string) {
		this.router.navigateByUrl(path);
	}
  
	hideDropdown() {
		console.log("hide dropdown");
	}
  
	toggleDarkMode() {
		this.darkModeService.toggleDarkMode();
	}
  
	handleLogout() {
		localStorage.removeItem('authToken');
		this.router.navigateByUrl('/login');
	}

}
