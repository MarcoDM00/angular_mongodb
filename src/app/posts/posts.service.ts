import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<any>("http://192.168.1.63:8080/index").subscribe((res) => {
            for (let p of res) {
                this.posts.push(new Post(
                    p['title'],
                    p['content'],
                    p['img'],
                    p['_id']
                ));
            }
            console.log("OK get");
        });
        return this.posts;
    }

    addPost(title:string, content: string, img: string) {
        const post: Post = new Post(title, content, img);
        this.posts.push(post);
        this.http.post("http://192.168.1.63:8080/add", post.toJSON()).subscribe((res) => {
            var id = res['id'];
            this.posts[this.posts.length - 1].setID(id.toString());
        });
    }

    deletePost(id: string) {
        this.http.post("http://192.168.1.63:8080/delete", {"id": id}).subscribe((res) => {
            console.log(res);
        });
    }
}