import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  /*posts:{title:String, content:String}[] = [
    {title: 'First Post', content:'First post\'s content'},
    {title: 'Second Post', content:'Second post\'s content'},
    {title: 'Third Post', content:'Third post\'s content'}
  ];*/
  posts:Post[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }
}