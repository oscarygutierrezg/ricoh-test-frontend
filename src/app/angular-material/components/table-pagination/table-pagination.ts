
import {Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NobelService } from 'src/app/services/nobel.service';
import { NobelPrizeDto } from 'src/app/model/nobel-prize-dto';


@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})

export class TablePaginationComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['anio', 'laureate', 'action'];

  dataSource: any;

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator | undefined;
  private nobelChangeObs: Subscription | undefined;
  nobel: NobelPrizeDto | undefined;
  nobeles: NobelPrizeDto []| undefined;

  constructor(
    private router: Router,
    private nobelService: NobelService,
    ) {
    }
  
  ngOnInit() {
    this.nobelChangeObs = this.nobelService.nobelObs.subscribe( (nobelesInfo: NobelPrizeDto []) => {
      this.nobeles = nobelesInfo.filter(n => n.laureates!= null);
      this.dataSource = new MatTableDataSource<NobelPrizeDto>(this.nobeles);
      this.dataSource.paginator = this.paginator;
  });
  }


  ngOnDestroy() {
    if(this.nobelChangeObs){
      this.nobelChangeObs.unsubscribe();
    }
  }


  

  show(id: string) {
    this.router.navigateByUrl(`/show/${id}`);
  }
  
 
}


