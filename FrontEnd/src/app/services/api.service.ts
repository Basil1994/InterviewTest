import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../services/hero';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API
  apiURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getHeroes(): Observable<Hero> {
    return this.http.get<Hero>(this.apiURL + '/api/heroes')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getHero(name): Observable<Hero> {
    return this.http.get<Hero>(this.apiURL + '/api/heroes/' + name)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  evolveHero(id, hero): Observable<Hero> {
    return this.http.put<Hero>(this.apiURL + '/api/heroes/' + id, hero[0], this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteHero(id) {
    return this.http.delete<Hero>(this.apiURL + '/api/heroes/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
