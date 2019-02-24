import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { DeleteTransactionComponent } from '../delete-transaction/delete-transaction.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['type', 'amount', 'category', 'addDate', 'actions'];
  dataSource: MatTableDataSource<any>;
  transaction: Transaction[];
  filtersForm: FormGroup;
  categories = ['Bills', 'Transport', 'Fuel', 'Shopping', 'Salary', 'Bonus', 'Food', 'Environment'];
  types = ['Income', 'Outcome'];
  selectedType: string;
  selectedCategory: string;
  balance: number;
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionService: TransactionService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe(
      success => {
        this.transaction = success as Transaction[];
        this.dataSource = new MatTableDataSource(success);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => this.showSnackbarIfDisconnected());
    this.filtersForm = new FormGroup({
      categoryFilter: new FormControl(),
      typeFilter: new FormControl()
    });
    this.transactionService.getBalance().subscribe(
      success => {
        this.balance = success;
      });
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

  getDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '40%';
    return dialogConfig;
  }

  openAddDialog(): void {
    this.dialog.open(AddTransactionComponent, this.getDialogConfig()).afterClosed().subscribe(result => { this.refresh(); });
  }

  openEditDialog(id: number, type: string, amount: number, category: string, addDate: Date): void {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      id: id,
      type: type,
      amount: amount,
      category: category,
      addDate: addDate
    };
    this.dialog.open(EditTransactionComponent, dialogConfig).afterClosed().subscribe(result => { this.refresh(); });
  }

  openDeleteDialog(id: number): void {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      id: id
    };
    this.dialog.open(DeleteTransactionComponent, dialogConfig).afterClosed().subscribe(result => { this.refresh(); });
  }

  refresh() {
    this.transactionService.getBalance().subscribe(balance => {
      this.balance = balance;
    });
    this.transactionService.getAllTransactions().subscribe(transactionList => {
      this.transaction = transactionList as Transaction[];
      this.dataSource = new MatTableDataSource(transactionList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.selectedType !== '' && this.selectedType !== undefined) {
        this.filterType(this.selectedType);
      }
      if (this.selectedCategory !== '' && this.selectedCategory !== undefined) {
        this.filterCategory(this.selectedCategory);
      }
    });
  }

  filterType(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filtersForm.get('categoryFilter').setValue('');
    this.searchForm.get('search').setValue('');
  }

  filterCategory(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filtersForm.get('typeFilter').setValue('');
    this.searchForm.get('search').setValue('');
  }

  showSnackbarIfDisconnected(): void {
    this.snackBar.open('Connection failed. Transactions cannot show.', '', {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filtersForm.get('typeFilter').setValue('');
    this.filtersForm.get('categoryFilter').setValue('');
  }

}

export class TransactionDataSource extends DataSource<any> {
  constructor(private transactionService: TransactionService) {
    super();
  }
  connect(): Observable<Transaction[]> {
    return this.transactionService.getAllTransactions();
  }
  disconnect() { }
}
