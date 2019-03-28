export class Book {
    id?: number;
    name: string = "";
    isbn: string = "";
    startDate: Date = null;
    finishDate: Date = null;
    authors: string[] = [];
    pageCount: number = 0;
    thumbnailUrl: string = "/assets/agenda.png";
    isFinished: boolean = false;

    constructor() {
        this.id = Date.now();
    }

    static clone(object: any) {
        let book = new Book();
        
        book.id = object.id;
        book.name = object.name;
        book.authors = object.authors;
        book.startDate = object.startDate;
        book.finishDate = object.finishDate;
        book.isFinished = object.isFinished;
        book.isbn = object.isbn;
        book.thumbnailUrl = object.thumbnailUrl;
        
        return book;
    }

    getStartDate(): string {
        if (this.startDate === null) {
            return null
        } 
    
        return this.startDate.toISOString().substring(0,10);
        
    }

    
    getFinishDate(): string {
        if (this.finishDate === null) {
            return null;
        }

        return this.finishDate.toISOString().substring(0, 10);

    }

}
