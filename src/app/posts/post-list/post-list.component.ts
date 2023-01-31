import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:Post[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }

  onDeletePost(i: number) {
    console.log(this.posts);
    console.log(this.posts[i].id);
    this.postsService.deletePost(this.posts[i].id);
  }

  print(i: number) {
    console.log(i);
    console.log("ID: " + this.posts[i].id);
  }
}