import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  accounts$ = this.accountsSubject.asObservable();

  createAccount(account: Omit<Account, 'id'>) {
    const newAccount = { ...account, id: uuid() };
    this.accountsSubject.next([...this.accountsSubject.value, newAccount]);
  }

  getAccountById(id: string): Account | undefined {
    return this.accountsSubject.value.find((a) => a.id === id);
  }

  updateAccount(updated: Account) {
    const updatedAccounts = this.accountsSubject.value.map((acc) =>
      acc.id === updated.id ? updated : acc
    );
    this.accountsSubject.next(updatedAccounts);
  }

  getAllAccounts(): Account[] {
    return this.accountsSubject.value;
  }
}
