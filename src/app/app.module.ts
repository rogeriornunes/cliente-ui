import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ClienteComponent} from './pages/cliente/cliente.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClienteService} from "./service/cliente.service";
import {NgxMaskModule} from "ngx-mask";
import {PagerService} from "./service/pager.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NotificationService} from "./notification/notification.service";

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      maxOpened: 4,
      closeButton: true,
      progressBar: true,
      autoDismiss: true,
      newestOnTop: false,
      preventDuplicates: true
    }),
    NgxMaskModule.forRoot({validation: true})
  ],
  providers: [ClienteService, PagerService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
