import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./posts/post-list/post-list.component";

const appRoutes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', redirectTo: '/auth/login' }
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
