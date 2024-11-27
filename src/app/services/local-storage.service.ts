import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  // Funcion para guardar datos en la sesion
  setKeyWithValue(key: string, value: any) {
    sessionStorage.setItem(key, this.encodeObject(value));
  }
  // Funcion para obtener datos de la sesion
  getValueByKey(key: string): any {
    let item = sessionStorage.getItem(key);
    if (item) {
      item = this.decodeObject(item);
    }
    return item ? item : null;
  }
  // Funcion para borrar datos de la sesion
  removeKey(key: string) {
    sessionStorage.removeItem(key);
  }

  encode(value: string): string {
    return btoa(value);
  }

  decode(value: string): string {
    return atob(value);
  }

  encodeObject(obj: any): string {
    return btoa(JSON.stringify(obj));
  }

  decodeObject(value: string): any {
    return JSON.parse(atob(value));
  }
}
