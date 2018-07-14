import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PreviewComponent } from './preview/preview.component';
import { SettingService } from './setting.service';
import { TalkBoxComponent } from './talk-box/talk-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PreviewComponent,
    TalkBoxComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule,
    FormsModule
  ],
  providers: [SettingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
