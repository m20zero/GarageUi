import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from 'app/Model/job';
import { JobCard } from 'app/Model/jobcard';

@Component({
  selector: 'app-jobcard-list',
  templateUrl: './jobcard-list.component.html',
  styleUrls: ['./jobcard-list.component.css']
})
export class JobCardListComponent implements OnInit {

  isLoading: boolean = true;
  jobCards$: JobCard[];
  jobStatus: string = this.route.snapshot.params.status?this.route.snapshot.params.status:"";
  constructor(private dataService: DataService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    if(this.jobStatus == "Completed" || this.jobStatus == "Pending"){
      if(this.jobStatus == "Completed"){
        this.dataService.getCompletedJobCards()
          .subscribe(data => {
            this.jobCards$ = data;
            this.isLoading = false;
          }
        ); 
      }else{
        this.dataService.getPendingJobCards()
          .subscribe(data => {
            this.jobCards$ = data;
            this.isLoading = false;
          }
        ); 
      }
    }else{
      this.dataService.getJobCards()
        .subscribe(data => {
          this.jobCards$ = data;
          this.isLoading = false;
        }
      );  
    }  
  }

  onClick(jobCardId:string){
    this.router.navigate(['/jobcard-detail',jobCardId]);
  }
}
