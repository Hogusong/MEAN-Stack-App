import { NgModule } from '@angular/core';
import { MatInputModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatExpansionModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
})

export class NgMaterialModule { }