import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NDaF1cWWhIfEx0TXxbf1x0ZFRGalhTTnVcUiweQnxTdEFiWH1WcXRRRWBZVEx/Vg=='
);
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
