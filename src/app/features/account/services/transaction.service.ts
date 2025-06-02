import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  recordTransaction(tx: Omit<Transaction, 'id' | 'date'>) {
    const newTx: Transaction = {
      ...tx,
      id: uuid(),
      date: new Date()
    };
    this.transactionsSubject.next([...this.transactionsSubject.value, newTx]);
  }

  getTransactionsByAccount(accountId: string): Transaction[] {
    return this.transactionsSubject.value.filter(tx =>
      tx.fromAccountId === accountId || tx.toAccountId === accountId
    );
  }
}
