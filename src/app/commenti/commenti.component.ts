import { Component, Input } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.css']
})
export class CommentiComponent {
  @Input() p:Post;
  nascondiCommenta:boolean = true;

  constructor(private postsService: PostsService) {}

  addCommento(user: string, text: string) {
    this.postsService.addCommento(this.p.id, user, text);
  }
}