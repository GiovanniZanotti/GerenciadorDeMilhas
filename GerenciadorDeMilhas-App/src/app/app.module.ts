import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, BsDropdownModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { ClienteService } from './_services/cliente.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ClientesComponent } from './Clientes/Clientes.component';
import { EdicaoClienteComponent } from './Clientes/EdicaoCliente/EdicaoCliente.component';
import { ContaCorrenteComponent } from './Clientes/EdicaoCliente/ContaCorrente/ContaCorrente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { AuthInterceptor } from './auth/auth.interceptor';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      ClientesComponent,
      EdicaoClienteComponent,
      ContaCorrenteComponent,
      DashboardComponent,
      TituloComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      DateTimeFormatPipePipe,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      NgxMaskModule.forRoot(),
      BrowserAnimationsModule,
      ToastrModule.forRoot()
   ],
   providers: [
      ClienteService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
