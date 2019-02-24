import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { DatePipe } from '@angular/common';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  isSubmitEnabled = false;
  categories = ['Bills', 'Transport', 'Fuel', 'Shopping', 'Salary', 'Bonus', 'Food', 'Environment'];

  constructor(private dialogRef: MatDialogRef<AddTransactionComponent>, private transactionService: TransactionService,
    private datePipe: DatePipe, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.transactionForm = new FormGroup({
      type: new FormControl(),
      category: new FormControl(),
      amount: new FormControl('',
      Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern(/^\d+(\.\d{1,2})?$/)])),
      addDate: new FormControl(new Date().toLocaleString())
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.transactionForm.controls[controlName].hasError(errorName);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    let addDate = this.transactionForm.value.addDate;
    addDate = this.datePipe.transform(addDate, 'yyyy-MM-dd');
    const transaction: Transaction = {
      id: 0,
      type: this.transactionForm.value.type,
      category: this.transactionForm.value.category,
      amount: this.transactionForm.value.amount,
      addDate: addDate
    };
    this.transactionService.createTransaction(transaction)
      .subscribe(
        success => console.log(success),
        error => console.log(error),
        () => this.showSnackbar()
      );
  }

  showSnackbar(): void {
    this.snackBar.open('Transaction has been added!', '', {
      duration: 2000,
    });
    this.dialogRef.close();
  }

  submitSetVisible(isSubmitEnabled: boolean): void {
    this.isSubmitEnabled = isSubmitEnabled;
  }
}
