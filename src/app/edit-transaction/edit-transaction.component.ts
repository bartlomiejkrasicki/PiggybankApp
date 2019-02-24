import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction';


@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  transactionForm: FormGroup;

  id: number;
  type: string;
  amount: number;
  category: string;
  addDate: Date;
  isSubmitEnabled = false;
  categories = ['Bills', 'Transport', 'Fuel', 'Shopping', 'Salary', 'Bonus', 'Food', 'Environment'];

  constructor(private dialogRef: MatDialogRef<EditTransactionComponent>, private snackBar: MatSnackBar,
    private transactionService: TransactionService, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
    this.type = data.type;
    this.amount = data.amount;
    this.category = data.category;
    this.addDate = data.addDate;
  }

  ngOnInit() {
    this.transactionForm = new FormGroup({
      type: new FormControl(),
      category: new FormControl(),
      amount: new FormControl('',
        Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern(/^\d+(\.\d{1,2})?$/)])),
      addDate: new FormControl(new Date())
    });
    this.transactionForm.get('category').setValue(this.category);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.transactionForm.controls[controlName].hasError(errorName);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    const transaction: Transaction = {
      id: this.id,
      type: this.transactionForm.value.type,
      category: this.transactionForm.value.category,
      amount: this.transactionForm.value.amount,
      addDate: this.transactionForm.value.addDate
    };
    console.log(transaction.amount);
    this.transactionService.updateTransaction(transaction)
      .subscribe(
        success => console.log(success),
        error => console.log(error),
        () => this.showSnackbar()
      );
  }

  showSnackbar(): void {
    this.snackBar.open('Transaction has been edited!', '', {
      duration: 2000,
    });
    this.dialogRef.close();
  }

  submitSetVisible(isSubmitEnabled: boolean): void {
    this.isSubmitEnabled = isSubmitEnabled;
  }
}
