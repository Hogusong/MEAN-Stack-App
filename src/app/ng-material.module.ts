import { NgModule } from '@angular/core';
import { MatInputModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule
  ],
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
})

export class NgMaterialModule { }