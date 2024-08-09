import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Data {
  file: Object;
  formData: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  addData(data: Data): Observable<any> {
    return this.http.post(`${this.apiUrl}/onboarding`, data);
  }

  getAllSubmittedData(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/notification`);
  }

  getDataById(id:string): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/notification/${id}`);
  }

}
