import { enableProdMode } from '@angular/core';
export { renderModule } from '@angular/platform-server';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
