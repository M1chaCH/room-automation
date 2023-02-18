import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpMethods} from "../configuration/app.config";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  callApi<T>(endpoint: string, method: HttpMethods, body: any): Observable<T> {
    if(!environment.IS_PROD) console.log("api - sending request: ", endpoint, method, body);

    const requestEndpoint = `${environment.API_URL}/${endpoint}`;
    let request;
    switch (method) {
      case "GET":
        request = this.http.get(requestEndpoint, body);
        break;
      case "POST":
        request = this.http.post(requestEndpoint, body);
        break;
      case "PUT":
        request = this.http.put(requestEndpoint, body);
        break;
      case "DELETE":
        request = this.http.delete(requestEndpoint, { body });
        break;
    }
    return (request as any) as Observable<T>;
  }
}