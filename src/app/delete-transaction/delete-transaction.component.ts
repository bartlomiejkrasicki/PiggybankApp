import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TransactionService } from '../services/transaction.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.css']
})
export class DeleteTransactionComponent implements OnInit {

  transactionForm = new FormGroup({});
  private id: number;

  constructor(private dialogRef: MatDialogRef<DeleteTransactionComponent>, private transactionService: TransactionService,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
    this.transactionForm = new FormGroup({
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    this.transactionService.deleteTransaction(this.id)
      .subscribe(
        success => console.log(success),
        error => console.log(error),
        () => this.showSnackbar()
      );
  }

  showSnackbar(): void {
    this.snackBar.open('Transaction has been deleted!', '', {
      duration: 2000,
    });
    this.dialogRef.close();
  }

}
