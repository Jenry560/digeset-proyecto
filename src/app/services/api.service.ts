import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { DataResponse } from '../models/DataResponse';

export const HttP_SERVICE_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //HttServiceUrl = 'http://cloudjarsoft.com/watersoft/Gasercom/';

  ApiUrl = '/api';

  constructor(private httpClient: HttpClient, public auth: AuthService) {}

  // Realiza una peticion Get al servicio en especicico
  public GetData(endpoint: String): Observable<any> {
    return this.httpClient
      .get<DataResponse>(`${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`)
      .pipe(map((res: any) => res.Result));
  }

  public GetDataResponse(endpoint: String): Observable<DataResponse> {
    return this.httpClient
      .get<DataResponse>(`${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`)
      .pipe(
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }

  // Realiza una peticion Post al servicio en especicico
  public PostData(
    endpoint: String,
    data: any,
    QueryStrinParams: any = null
  ): Observable<DataResponse> {
    return this.httpClient
      .post<DataResponse>(
        `${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`,
        data,
        { params: QueryStrinParams }
      )
      .pipe(
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }

  public PostFormData(endpoint: String, data: any): Observable<DataResponse> {
    return this.httpClient
      .post<DataResponse>(`${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`, data)
      .pipe(
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }

  public PutFormData(endpoint: String, data: any): Observable<DataResponse> {
    return this.httpClient
      .put<DataResponse>(`${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`, data)
      .pipe(
        map((res: DataResponse) => {
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }
  // Realiza una peticion Put al servicio en especicico
  public PutData(
    endpoint: String,
    data: any,
    QueryStrinParams: any = null
  ): Observable<DataResponse> {
    return this.httpClient
      .put<DataResponse>(
        `${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`,
        data,
        { params: QueryStrinParams }
      )
      .pipe(
        map((res: DataResponse) => {
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }

  // Realiza una peticion Delete al servicio en especicico
  public Delete(
    endpoint: String,
    QueryStrinParams: any = null
  ): Observable<DataResponse> {
    return this.httpClient
      .delete<DataResponse>(`${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`, {
        params: QueryStrinParams,
      })
      .pipe(
        map((res: DataResponse) => res),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }

  // Peticion para cambiar el estado
  public PutDataEstado(
    endpoint: String,
    QueryStrinParams: any = null
  ): Observable<DataResponse> {
    return this.httpClient
      .put<DataResponse>(`${HttP_SERVICE_URL}${this.ApiUrl}/${endpoint}`, {
        params: QueryStrinParams,
      })
      .pipe(
        map((res: DataResponse) => res),
        catchError((error: HttpErrorResponse) => {
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }
}
