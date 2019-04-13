import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    recentBook = null;
    
    constructor(private dbService: DatabaseService) {}

    
    ngOnInit() {
      this.dbService.getRecentlyFinished().then((val) => {
        this.recentBook = val;
      });

    }

}
