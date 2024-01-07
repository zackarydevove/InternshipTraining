import { Component } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-random-add',
  templateUrl: './random-add.component.html',
  styleUrls: ['./random-add.component.css']
})
export class RandomAddComponent {
	randomUsers: UserInterface[] = [
		{
			id: 1,
			email: 'test1@example.com',
			password: 'password123',
			username: 'testuser1',
			followersCount: 10,
			location: 'Paris',
			job: 'Software Engineer',
			followers: [],
			following: [],
			posts: [],
			likes: [],
			comments: []
		},
		{
			id: 2,
			email: 'test2@example.com',
			password: 'password123',
			username: 'testuser2',
			followersCount: 10,
			location: 'Paris',
			job: 'Social Media Manager',
			followers: [],
			following: [],
			posts: [],
			likes: [],
			comments: []
		},
	]
}
