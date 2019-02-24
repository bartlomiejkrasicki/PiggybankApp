import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TransactionService {

  private piggyBankApiUrl = 'https://localhost:5001/api/transactions';

  constructor(private httpClient: HttpClient) {
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.piggyBankApiUrl);
  }

  getTransactionById(id: number): Observable<Transaction> {
    const url = `${this.piggyBankApiUrl}/${id}`;
    return this.httpClient.get<Transaction>(url);
  }

  getBalance(): Observable<number> {
    const url = `${this.piggyBankApiUrl}/getbalance`;
    return this.httpClient.get<number>(url);
  }

  updateTransaction(transaction: Transaction): Observable<any> {
    const url = `${this.piggyBankApiUrl}/${transaction.id}`;
    return this.httpClient.put(url, transaction, httpOptions);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.piggyBankApiUrl, transaction, httpOptions);
  }

  deleteTransaction(id: number): Observable<any> {
    const url = `${this.piggyBankApiUrl}/${id}`;
    return this.httpClient.delete<any>(url, httpOptions);
  }
}
