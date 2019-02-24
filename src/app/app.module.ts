import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionService } from './services/transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule,
  MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatRadioModule, MatDialogModule,
  MatDatepickerModule, MatNativeDateModule, MatIconModule, MatSnackBarModule, MatCardModule, MatMenuModule } from '@angular/material';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';
import { CommonModule, DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    EditTransactionComponent,
    AddTransactionComponent,
    DeleteTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [TransactionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
