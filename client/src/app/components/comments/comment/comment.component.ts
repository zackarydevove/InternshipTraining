import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommentInterface } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
	@Input() comment!: CommentInterface;

	constructor(private router: Router) {}
  
	navigateToProfile(username: string) {
	  	this.router.navigate(['/profile/', username]);
	}
}
