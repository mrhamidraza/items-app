import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  private localStorageKey = 'items';

  constructor() { }

  private getItemsFromStorage(): Item[] {
    const itemsJSON = localStorage.getItem(this.localStorageKey);
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  }

  private saveItemsToStorage(items: Item[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

  addItem(item: Item): Observable<Item> {
    const items = this.getItemsFromStorage();
    
    item.id = new Date().getTime();
    items.push(item);
    this.saveItemsToStorage(items);
    return of(item);
  }

  getItems(): Observable<Item[]> {
    const items = this.getItemsFromStorage();
    return of(items);
  }

  getItemById(id: number): Observable<Item | undefined> {
    const items = this.getItemsFromStorage();
    const item = items.find(item => item.id === id);
    return of(item);
  }

  updateItem(updatedItem: Item): Observable<Item> {
    let items = this.getItemsFromStorage();
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index > -1) {
      items[index] = updatedItem;
      this.saveItemsToStorage(items);
    }

    return of(updatedItem);
  }

  deleteItem(id: number): Observable<boolean> {
    let items = this.getItemsFromStorage();
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
      items.splice(index, 1);
      this.saveItemsToStorage(items);
      return of(true);
    }
    return of(false);
  }
}
