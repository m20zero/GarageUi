import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from 'app/Model/job';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  isLoading: boolean = true;
  jobs$: Job[];
  jobStatus: string = this.route.snapshot.params.status?this.route.snapshot.params.status:"";
  constructor(private dataService: DataService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    if(this.jobStatus == "Completed" || this.jobStatus == "Pending"){
      if(this.jobStatus == "Completed"){
        this.dataService.getCompletedJobs()
          .subscribe(data => {
            this.jobs$ = data;
            this.isLoading = false;
          }
        ); 
      }else{
        this.dataService.getPendingJobs()
          .subscribe(data => {
            this.jobs$ = data;
            this.isLoading = false;
          }
        ); 
      }
    }else{
      this.dataService.getJobs()
        .subscribe(data => {
          this.jobs$ = data;
          this.isLoading = false;
        }
      );  
    }  
  }

  onClick(jobId:string){
    this.router.navigate(['/job-detail',jobId]);
  }
}
