import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: "./post-create.component.html",
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    inputTitle = ''
    inputContent = "";
    img:string = '';

    constructor(private postsService: PostsService) {}

    readImg(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var classe = this;
        reader.onload = function (e) {
            classe.img = e.target.result.toString();
        };
        reader.readAsDataURL(file);
    }

    onAddPost(form: NgForm) {
        if (form.invalid) return;
        this.postsService.addPost(form.value.title, form.value.content, this.img);
        form.resetForm();
        this.img = '';
    }
}