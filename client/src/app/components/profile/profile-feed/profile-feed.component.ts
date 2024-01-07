import { Component, Input } from '@angular/core';
import { PostInterface } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css']
})
export class ProfileFeedComponent {
	@Input() posts!: PostInterface[];

}
