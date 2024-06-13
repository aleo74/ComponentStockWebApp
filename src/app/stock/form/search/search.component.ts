import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from '../../../core/class/stocks';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styles: ''
})
export class SearchComponent implements OnInit {
  
  searchTerm: string = '';
  stock$!: Observable<Stock[]>;
  stockList: Stock[] = [];

  constructor(private router: Router, private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.stocks$.subscribe(stocks => {
      this.stockList = stocks;
    });
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  get filteredStocks(): Stock[] {
    return this.stockList.filter(stock => stock.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  gotToDetail(stock: Stock) {
    this.router.navigate(['/detail/'+stock._id]);
  }

}
