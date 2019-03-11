import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgMaterialModule } from "../ng-material.module";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgMaterialModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule { }