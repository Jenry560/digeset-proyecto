import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import './dotenv.config'; // Asegúrate de que este archivo sea importado para cargar el .env


const syncfusionLicense = process.env['LICENSE_KEY'] || '';  // Usa la variable de entorno

registerLicense(syncfusionLicense);


bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
