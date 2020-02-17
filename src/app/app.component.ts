import { Component, OnInit} from '@angular/core';
import { DataService } from './data.service';
import { AuthenticationService} from './authentication.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  visible: boolean = true;
  constructor(public auth : AuthenticationService){
  }

  ngOnInit() {
  }
}


