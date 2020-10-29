import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './Clientes/Clientes.component';
import { EdicaoClienteComponent } from './Clientes/EdicaoCliente/EdicaoCliente.component';
import { ContaCorrenteComponent } from './Clientes/EdicaoCliente/ContaCorrente/ContaCorrente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'cliente/:id/edicao', component: EdicaoClienteComponent, canActivate: [AuthGuard] },
  { path: 'edicao/:id/conta-corrente', component: ContaCorrenteComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
