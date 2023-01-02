
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NobelPrizeDto } from '../model/nobel-prize-dto';
import { Category } from '../model/enum/category';
import { NobelPrizeRequest } from '../model/nobel-prize-request';


@Injectable({ providedIn: 'root' })
export class NobelService {
  private nobelUrl = '/external/v1/nobel';
  nobelObs = new Subject<NobelPrizeDto []>();
  nobeles: NobelPrizeDto [] = [];

  constructor(
    private http: HttpClient
  ) { }


  createHttpOptions  () {
    return {  headers: new HttpHeaders({ 'Content-Type': 'application/json',  
    'Authorization':'Bearer ' +
    localStorage.getItem('token'),
    'Access-Control-Allow-Origin': '*'
  
  })
  }
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
    localStorage.getItem('token')); 
    headers.append('Content-Type', 'application/json'); 
  }

  getNobelInfo(request :NobelPrizeRequest): Observable<NobelPrizeDto[]> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get<NobelPrizeDto []>(`${environment.api}${this.nobelUrl}/${request.category}/${request.yearFrom}/${request.yearTo}`,this.createHttpOptions())
      .pipe(
        tap(_ => {
          this.nobeles = _;
          this.nobelObs.next(_);
          console.log(JSON.stringify(_ ));
          this.log('fetched Changes');
        }),
        catchError(this.handleError<NobelPrizeDto []>('getNobelInfo'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
