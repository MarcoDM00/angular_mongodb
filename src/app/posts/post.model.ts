export class Post {
    id: number;
    title: string;
    content: string;
    like?: number;
    dislike?: number;
    img: string;
    commenti?: string[];

    constructor(id:number, title: string, content: string, img:string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.like = 0;
        this.dislike = 0;
        this.img = img;
        this.commenti = [];
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            like: this.like,
            dislike: this.dislike,
            img: this.img,
            commenti: this.commenti
        };
    }
}