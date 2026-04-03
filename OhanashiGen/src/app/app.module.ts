import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PreviewComponent } from './preview/preview.component';
import { SettingService } from './setting.service';
import { TalkBoxComponent } from './talk-box/talk-box.component';
import { PresetComponent } from './preset/preset.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CanvasComponent } from './canvas/canvas.component';
import { TalkBoxDoubleComponent } from './talk-box-double/talk-box-double.component';

@NgModule({ declarations: [
        AppComponent,
        MainComponent,
        PreviewComponent,
        TalkBoxComponent,
        PresetComponent,
        CanvasComponent,
        TalkBoxDoubleComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        RouterModule,
        FormsModule], providers: [SettingService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
