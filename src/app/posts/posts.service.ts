import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<any>("http://192.168.47.78:8080/index").subscribe((res) => {
            for (let p of res) {
                this.posts.push(new Post(
                    p['title'],
                    p['content'],
                    p['img'],
                    p['_id'],
                    p['like'],
                    p['dislike'],
                    p['commenti']
                ));
            }
            console.log("OK get");
        });
        return this.posts;
    }

    addPost(title:string, content: string, img: string) {
        const post: Post = new Post(title, content, img);
        this.posts.push(post);
        this.http.post("http://192.168.47.78:8080/add", post.toJSON()).subscribe((res) => {
            var id = res['id'];
            this.posts[this.posts.length - 1].setID(id.toString());
        });
    }

    addCommento(id: string, user: string, text: string) {
        this.http.post("http://192.168.47.78:8080/commenta", {id, user, text}).subscribe((res) => {
            console.log(res);
        });
    }

    deletePost(id: string) {
        this.http.post("http://192.168.47.78:8080/delete", {"id": id}).subscribe((res) => {
            console.log(res);
        });
    }

    update(id: string, like: number, dislike: number, commenti: {user:string, text:string}[]) {
        this.http.post("http://192.168.47.78:8080/update", {id, like, dislike, commenti}).subscribe((res) => {
            console.log(res);
        });
    }
}