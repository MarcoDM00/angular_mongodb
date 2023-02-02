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
  updateInfos;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }

  onDeletePost(i: number) {
    this.postsService.deletePost(this.posts[i].id);
    this.posts.splice(i, 1);
  }

  update(i: number) {
    if (this.updateInfos == null) {
      this.updateInfos = setTimeout(() => {
        console.log("chiamata update")
        var p = this.posts[i];
        this.postsService.update(p.id, p.like, p.dislike, p.commenti);
        this.updateInfos = null;
      }, 2000);
    }
  }
}