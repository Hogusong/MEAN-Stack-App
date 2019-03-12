import { NgModule } from '@angular/core';
import { MatInputModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
})

export class NgMaterialModule { }