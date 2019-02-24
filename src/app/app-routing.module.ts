import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { EditTransactionComponent} from './edit-transaction/edit-transaction.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions/add', component: AddTransactionComponent },
  { path: 'transactions/edit', component: EditTransactionComponent },
  { path: 'transactions/delete', component: DeleteTransactionComponent },
  { path: '', redirectTo: 'transactions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
