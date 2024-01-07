import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
	fakeProfile = {
	  username: 'johndoe',
	  followersCount: 150,
	  location: 'New York, USA',
	  job: 'Software Developer'
	};

	constructor(private router: Router) {}

	navigate(path: string) {
		this.router.navigateByUrl(path);
	}
}
