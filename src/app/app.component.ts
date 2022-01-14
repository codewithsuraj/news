import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup
  searchedBy = 'Latest News'
  newsData: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.formInit()
    this.getData(this.searchedBy, this.getFromDate())
  }

  formInit() {
    this.form = new FormGroup({
      searchText: new FormControl(''),
    });
  }

  getData(searchText: string, fromDate: string) {
    const baseUrl = 'https://newsapi.org/v2/everything'
    const apiKey = '&apiKey=9382b0e2640845b088a6949837166233'
    const query = `?q=${searchText}&from=${fromDate}&sortBy=publishedAt`
    const finalUrl = baseUrl + query + apiKey
    this.http.get(finalUrl).subscribe((newsData: any) => {
      console.log(newsData);
      this.newsData = newsData
      this.searchedBy = searchText
    })
  }

  onSubmit() {
    const searchText = this.form.get('searchText')?.value
    const fromDate = this.getFromDate()
    this.getData(searchText, fromDate)
  }

  getFromDate() {
    const date = new Date()
    return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
  }

}
