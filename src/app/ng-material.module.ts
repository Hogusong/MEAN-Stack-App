import { NgModule } from '@angular/core';
import { MatInputModule, MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule
  ],
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatButtonModule
  ],
})

export class NgMaterialModule { }