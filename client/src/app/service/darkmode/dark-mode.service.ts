import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
	private darkMode = false;
  
	toggleDarkMode(): void {
	  this.darkMode = !this.darkMode;
	  document.body.classList.toggle('dark', this.darkMode);
	}
  
	isDarkModeEnabled(): boolean {
	  return this.darkMode;
	}
}
