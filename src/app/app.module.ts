import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ClienteComponent} from './cliente/cliente.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClienteService} from "./service/cliente.service";
import {NgxMaskModule} from "ngx-mask";
import {PagerService} from "./service/pager.service";

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({validation: true})
  ],
  providers: [ClienteService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
