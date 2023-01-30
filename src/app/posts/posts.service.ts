import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    id: number = 0;

    constructor(private http: HttpClient) {}

    getPosts() {
        //get from server
        return this.posts;
    }

    addPost(title:string, content: string, img: string) {
        const post: Post = new Post(this.id, title, content, img);
        this.posts.push(post);
        this.id++;
        this.http.post("http://192.168.1.63:8080/add", post.toJSON()).subscribe((res) => {
            console.log(res);
        });
    }
}