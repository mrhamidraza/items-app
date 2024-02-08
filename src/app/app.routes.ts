import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemEditComponent } from './item-edit/item-edit.component';


export const routes: Routes = [
  { path: '', redirectTo: 'items-list', pathMatch: 'full' },
  { path: 'items-list', component: ItemsListComponent, pathMatch: 'full' },
  { path: 'edit-item/:id', component: ItemEditComponent },
];
