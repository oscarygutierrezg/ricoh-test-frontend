import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NobelService } from 'src/app/services/nobel.service';
import { NobelPrizeDto } from 'src/app/model/nobel-prize-dto';

@Component({
  selector: 'app-nobel-list-show',
  templateUrl: './nobel-list-show.component.html',
  styleUrls: ['./nobel-list-show.component.css']
})
export class NobelListShowComponent implements OnInit{
  private nobelId: String = '';
  nobel: NobelPrizeDto | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
      private nobelService: NobelService) {
    }

  ngOnInit() {
    this.nobelId = this.activatedRoute.snapshot.params['id'];
    this.nobel = this.nobelService.nobeles.filter(n => n.index == this.nobelId)[0];
  }


  logout(){
    this.router.navigate(['/nobeles']);
  }
}

