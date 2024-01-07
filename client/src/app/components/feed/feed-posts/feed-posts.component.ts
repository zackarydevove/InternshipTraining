import { Component } from '@angular/core';
import { PostInterface, UserInterface } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent {

	users: UserInterface[] = [
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
	posts: PostInterface[] = [
		{
			id: 1,
			creatorId: 1,
			creator: this.users[0],
			content: "salut a tous",
			createdAt: new Date(),
			likesCount: 6,
			likes: [],
			commentsCount: 7,
			comments:[
				{
					id: 1,
					postId: 1,
					userId: 1,
					user: this.users[0],
					content: "First comment yeap",
					createdAt: new Date(),
				},
				{
					id: 2,
					postId: 1,
					userId: 2,
					user: this.users[1],
					content: "Second comment yeap",
					createdAt: new Date(),

				}
			],
		},
		{
			id: 2,
			creatorId: 2,
			creator: this.users[1],
			content: "ouais c greg",
			createdAt: new Date(),
			likesCount: 2,
			likes: [],
			commentsCount: 4,
			comments:[
				{
					id: 1,
					postId: 2,
					userId: 1,
					user: this.users[0],
					content: "First comment yeap",
					createdAt: new Date(),
				},
				{
					id: 2,
					postId: 2,
					userId: 2,
					user: this.users[1],
					content: "Second comment yeap",
					createdAt: new Date(),

				}
			],
		},
	]
}
