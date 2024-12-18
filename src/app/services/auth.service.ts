import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { HttP_SERVICE_URL } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { DataResponse } from '../models/DataResponse';
import { Usuarios } from '../models/Usuario';
import { Agente } from '../models/Agente';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Titulo: string = ''; // Titulo de la pagina que se muestra en el navegador
  private httpClient = inject(HttpClient); // Inyección del servicio HttpClient
  private localStorageService = inject(LocalStorageService); // Inyección del servicio LocalStorageService

  private toastr = inject(ToastrService); // Inyección del servicio ToastrService
  static loadingHeader = true; // Esta variable se encarga de mostrar el loading en el header interceptor
  public isPuntoVenta = false; //Variable si el punto de venta esta en true osea esta en la pagina no se va mostrar ni el header ni la navegación
  public usuarioData!: Usuarios;
  public agenteData!: Agente;
  tipoLogin: string = '';

  formatDate(fecha: Date, format: string = 'yyyy-MM-dd'): string {
    const datepipe: DatePipe = new DatePipe('en-US');

    return datepipe.transform(fecha, format) as string;
  }
  public LoginUser(
    loginData: any,
    tipo: string = 'Usuario'
  ): Observable<DataResponse> {
    return this.httpClient
      .post<DataResponse>(`${HttP_SERVICE_URL}/Auth/Login/${tipo}`, loginData)
      .pipe(
        map((response) => {
          // Maneja la respuesta exitosa
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          // Maneja la respuesta de error
          const responseError = error.error as DataResponse;
          return of(responseError);
        })
      );
  }

  public ShowMessaje(title: string, mesaje: string, icon: SweetAlertIcon) {
    return Swal.fire(title, mesaje, icon);
  }
  public ShowSuccesMessaje(title: string, html: string, timer: number = 1500) {
    return Swal.fire({
      icon: 'success',
      title: title,
      html: html,
      showConfirmButton: false,
      timer: timer,
    });
  }
  public ShowConfirm(
    title: string,
    text: string,
    confirmButtonText: string,
    icon: SweetAlertIcon
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false;
    });
  }

  //Funcion logout para que rediriga al login
  public logout() {
    this.localStorageService.removeKey('userLog'); // Limpia el local storage
    window.location.href = '/auth/login'; // Redirecciona a la pagina de login
  }

  public getDatauUser() {
    return this.localStorageService.getValueByKey('userLog');
  }

  showNotification(
    title: string,
    mensaje: string,
    type: 'error' | 'success' = 'success'
  ) {
    if (title.includes('Error')) {
      type = 'error';
    }
    if (type === 'success') {
      this.toastr.success(mensaje, title, {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    this.toastr.error(mensaje, title, {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  //Ajustar la fecha horario exacta ya que angular da problema
  adjusDate(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }

  isAdmin() {
    return this.usuarioData != null && this.usuarioData.UsuarioId == 1;
  }
  isUser() {
    return this.usuarioData != null && this.usuarioData.UsuarioId > 1;
  }
  isAgente() {
    return this.agenteData != null;
  }

  isAuthenticated() {
    return this.localStorageService.getValueByKey('userLog') != null;
  }
}
