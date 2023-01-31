export class Post {
    id: string;
    title: string;
    content: string;
    like?: number;
    dislike?: number;
    img: string;
    commenti?: string[];

    constructor(title: string, content: string, img:string, id?: string, like?: number, dislike?: number, commenti?: string[]) {
        this.id = id || "";
        this.title = title;
        this.content = content;
        this.like = like || 0;
        this.dislike = dislike || 0;
        this.img = img;
        this.commenti = commenti || [];
    }

    setID(id: string) {
        this.id = id;
    }

    toJSON() {
        return {
            "id": this.id,
            "title": this.title,
            "content": this.content,
            "like": this.like,
            "dislike": this.dislike,
            "img": this.img,
            "commenti": this.commenti
        };
    }
}