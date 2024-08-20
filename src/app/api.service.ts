import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Data {
  file: Object;
  formData: string;
  status: string;
}

interface FormData{
  formName: string;
  formFieldConfigs: string;
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

  getAllSubmittedData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notification`);
  }

  getDataById(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notification/${id}`);
  }

  updateData(id: string, data: Data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-form/${id}`, data);
  }

  getFormById(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-form-configs/${id}`);
  }

  updateFormConfigs(id: string, data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-form-configs/${id}`, data);
  }

  createNewForm(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-new-form`, data);
  }
}
