import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { favotiteReducer } from './cards.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('favoriteCards', favotiteReducer)],
})
export class FavoriteModule {}
