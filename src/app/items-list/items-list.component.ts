import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ItemEditComponent } from '../item-edit/item-edit.component';


@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    ConfirmationDialogComponent,
    ItemEditComponent
  ],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'category' ,'actions'];

  constructor(private itemService: ItemService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  addItem(): void {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '600px',
      height: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshList();
      }
    });
  }

  editItem(item: Item): void {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '600px',
      height: '800px',
      data: { item: item }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  refreshList(): void {
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  openConfirmationDialog(itemId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteItem(itemId);
      }
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }
}
