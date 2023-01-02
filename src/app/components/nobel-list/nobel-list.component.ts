import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NobelService } from 'src/app/services/nobel.service';
import { Category } from 'src/app/model/enum/category';
import { NobelPrizeDto } from 'src/app/model/nobel-prize-dto';
import { NobelPrizeRequest } from 'src/app/model/nobel-prize-request';

@Component({
  selector: 'app-nobel-list',
  templateUrl: './nobel-list.component.html',
  styleUrls: ['./nobel-list.component.css']
})
export class NobelListComponent implements OnInit,  OnDestroy{
  private nobelesChangeObs: Subscription | undefined;

  constructor(
    private router: Router,
      private nobelService: NobelService) {
    }
  ngOnDestroy(): void {
    if(this.nobelesChangeObs){
      this.nobelesChangeObs.unsubscribe();
    }

  }

  ngOnInit() {
    this.nobelesChangeObs = this.nobelService.nobelObs.subscribe( (c: NobelPrizeDto []) => {
    });
  }
  
  recibirRequest(request :NobelPrizeRequest){
    this.nobelService.getNobelInfo(request)
    .subscribe(_ => {
      console.log(JSON.stringify(_ ));
    });
  }
  
}

