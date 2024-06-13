import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { APP_CONFIG } from '../../../../environments/environment';
import { Stock } from '../../class/stocks';
import { Tags } from '../../class/tags';
import { User } from '../../class/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private stockChangedSubject = new Subject<void>();
  stockChanged$ = this.stockChangedSubject.asObservable();

  private stocksSubject = new BehaviorSubject<Stock[]>([]);
  stocks$ = this.stocksSubject.asObservable();

  private tagsChangedSubject = new Subject<void>();
  tagChanged$ = this.tagsChangedSubject.asObservable();

  private tagsSubject = new BehaviorSubject<Tags[]>([]);
  tags$ = this.tagsSubject.asObservable();

  constructor(private http: HttpClient) { }

  register() {

  }

  login(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(APP_CONFIG.apiUrl + '/login', user, httpOptions);
  }

  loadStocks(): Observable<Stock[]>  {
    return this.http.get<Stock[]>(APP_CONFIG.apiUrl + '/get_stocks').pipe(
      tap(stocks => this.stocksSubject.next(stocks))
    );
  }

  getStocks(): Observable<Stock[]> {
    return this.stocks$;
  }

  getStocksByName(name: string): Observable<Stock[]> {
    if(name.length <=1) {
      return of([]);
    }
    return this.http.get<Stock[]>(APP_CONFIG.apiUrl + '/get_stocks/' + name);
  }

  getStocksById(id: string) {
    return this.http.get<Stock>(APP_CONFIG.apiUrl + '/get_stock_id/'+ id);
  }

  saveStock(formData: FormData): Observable<any>  {
    return this.http.post<any>(APP_CONFIG.apiUrl + '/save_stock', formData).pipe(
      tap((newStock) => {
        const currentStocks = this.stocksSubject.value;
        this.stocksSubject.next([...currentStocks, newStock]);
      })
    );
  }

  editStock(id: string, formData: FormData): Observable<any>  {
    return this.http.put<any>(APP_CONFIG.apiUrl + '/edit_stock/'+ id, formData);
  }

  deleteStock(id: string): Observable<any> {
    return this.http.delete<any>(APP_CONFIG.apiUrl + '/delete_stock/'+id).pipe(
      tap(() => {
        const currentStocks = this.stocksSubject.value;
        this.stocksSubject.next(currentStocks.filter(stock => stock._id !== id));
      })
    );
  }

  getImageUrl(imageLink: string): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<Blob>(`${APP_CONFIG.apiUrl}/images/${imageLink}`, httpOptions);
  }

  notifyStockChanged() {
    this.stockChangedSubject.next();
  }

  loadTags(): Observable<Tags[]>  {
    return this.http.get<Tags[]>(APP_CONFIG.apiUrl + '/get_tags').pipe(
      tap(tags => this.tagsSubject.next(tags))
    );
  }

  getTags(): Observable<Tags[]> {
    return this.tags$;
  }

  saveTag(tag: Tags): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(APP_CONFIG.apiUrl + '/save_tag', tag, httpOptions).pipe(
      tap((newTag) => {
        const currentTag = this.tagsSubject.value;
        this.tagsSubject.next([...currentTag, newTag]);
      })
    );
  }

  editTag(id: string, tag: Tags): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(APP_CONFIG.apiUrl + '/edit_tag/'+ id, tag, httpOptions);
  }

  deleteTag(id: string): Observable<any> {
    return this.http.delete<any>(APP_CONFIG.apiUrl + '/delete_tag/'+id).pipe(
      tap(() => {
        const currentTag = this.tagsSubject.value;
        this.tagsSubject.next(currentTag.filter(tag => tag._id !== id));
      })
    );
  }

  deleteTagAndUpdateStocks(tagId: string): Observable<any> {
    return this.http.delete<any>(`${APP_CONFIG.apiUrl}/delete_tag_and_update_stocks/${tagId}`).pipe(
      tap(() => {
        // Recharger les stocks après la mise à jour
        this.loadStocks().subscribe();
      })
    );
  }

  getTagById(tagId: string) {
    return this.http.get<Tags>(APP_CONFIG.apiUrl + '/get_tag_id/'+ tagId);
  }

  notifyTagsChanged() {
    this.tagsChangedSubject.next();
  }

}
