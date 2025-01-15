import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(environment.baseUrl + endpoint);
  }

  post(endpoint: string, data: any) {
    return this.http.post(environment.baseUrl + endpoint, data);
  }

  put(endpoint: string, data: any) {
    return this.http.put(environment.baseUrl + endpoint, data);
  }

  delete(endpoint: string) {
    return this.http.delete(environment.baseUrl + endpoint);
  }
}
