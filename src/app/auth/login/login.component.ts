import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  form: FormGroup = this.fb.group({
    Cedula: ['', Validators.required],
    Clave: ['', Validators.required],
    Tipo: ['Usuario'],
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.auth
      .LoginUser(this.form.value, this.form.value.Tipo)
      .subscribe((data) => {
        if (data.IsSuccess) {
          // Almacena los datos en el session storage
          let dataLogin = {
            data: data.Result,
            tipo: this.form.value.Tipo,
          };
          this.localStorageService.setKeyWithValue('userLog', dataLogin); // Almacena el usuario en el session storage
          window.location.href = '/';
        } else {
          this.auth.ShowMessaje('Error credenciales', data.Message, 'error');
        }
      });
  }

  InvalidControl(name: string) {
    // retorna true si el campo es invalido
    return this.form.get(name)?.invalid && this.form.get(name)?.touched;
  }
}
