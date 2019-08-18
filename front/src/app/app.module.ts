import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor} from "./helpers/error-interceptor";
import {LayoutModule} from "./layout/layout.module";
import { FanComponent } from './fan/fan.component';
import { HomeComponent } from './home/home.component';
import { FanCreateComponent } from './fan/fan-create/fan-create.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpRequestInterceptor} from "./helpers/http-request-interceptor";
import { SendEmailComponent } from './shared/modal/send-email/send-email.component';

@NgModule({
    declarations: [
        AppComponent,
        FanComponent,
        HomeComponent,
        FanCreateComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        LayoutModule
    ],
    entryComponents: [ SendEmailComponent ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
