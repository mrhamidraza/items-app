import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../models/item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    RouterModule
  ],
})

export class ItemEditComponent implements OnInit {
  itemForm: FormGroup;
  categories: string[] = ['Pizza', 'Burger', 'Drink'];
  isEdit: boolean = false;
  itemId?: number;
  title = 'Add Item';


  constructor(
    public dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, 
    private itemService: ItemService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      variation: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      deliveryPrice: [0, Validators.min(0)],
      pickupPrice: [0, Validators.min(0)],
      dineInPrice: [0, Validators.min(0)],
      image: ['']
    });

    if (this.data.item) {
      this.title = 'Edit Item';
      this.isEdit = true;
      this.itemId = this.data.item.id;
      this.itemForm.patchValue(this.data.item);
    } else {
      this.isEdit = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.item) {
      // Assuming you have a method to initialize or patch your form with the item data
      this.initializeFormWithItemData(this.data.item);
    }
  }
  
  initializeFormWithItemData(item: Item): void {
    // Use the item data to initialize or patch the form
    // For example, if using a FormGroup:
    this.itemForm.patchValue(item);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      
      if (this.isEdit && this.itemId) {
        this.itemService.updateItem({ ...formData, id: this.itemId }).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (error) => console.error('Error updating item:', error),
        });
      } else {
        this.itemService.addItem(formData).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (error) => console.error('Error adding item:', error),
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/items-list']);
  }
}
