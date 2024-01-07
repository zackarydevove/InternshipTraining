import { Component, Input } from '@angular/core';
import { CommentInterface } from 'src/app/interfaces/UserInterface';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
	@Input() comments!: CommentInterface[];
}
