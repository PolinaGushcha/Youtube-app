import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppModule { }
