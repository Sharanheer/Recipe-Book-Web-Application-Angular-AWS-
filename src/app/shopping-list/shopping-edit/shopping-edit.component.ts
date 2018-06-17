import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';




@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') editForm:NgForm;
  newIngredient: Ingredient;
  editIngredient: Ingredient;
  editMode: boolean = false;
  editIndex: number;
  mySubject: Subscription

  constructor(private shoplist: ShoppingListService) {}

  ngOnInit() {
      this.mySubject = this.shoplist.editIngredientIndex.subscribe(
        (index:number) => {
            this.editIndex = index;
            this.editIngredient = this.shoplist.getEditIngredient(index);
            this.editMode = true;
            this.editForm.setValue({
              name: this.editIngredient.name,
              amount: this.editIngredient.amount
            });
        }
      );
  }
  
  onSubmit(form:NgForm){
    
    this.newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.shoplist.editIngredient(this.editIndex, this.newIngredient);
    }else{
      this.shoplist.addIngredient(this.newIngredient);
    }
    this.editForm.reset({
      name:'',
      amount:''
    });
    this.editMode = false;
  }

  onClear(){
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoplist.deleteIngredient(this.editIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.mySubject.unsubscribe();
  }


}
