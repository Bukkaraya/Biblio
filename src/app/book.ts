export class Book {
    id: number;

    constructor(public name: string = "", public isbn: string = "", 
        public authors: string[] = [""], public pageCount: number = 0, 
        public startDate: Date = null, public finishDate: Date = null,
        public thumbnailUrl: string = "/assets/agenda.png", 
        public isFinished: boolean = false, public formatOwned: string = "physical") {

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
        book.pageCount = object.pageCount;
        book.thumbnailUrl = object.thumbnailUrl;
        book.formatOwned = object.formatOwned;
        
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
