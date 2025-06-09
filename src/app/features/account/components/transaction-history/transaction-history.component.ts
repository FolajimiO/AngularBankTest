import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { AccountService } from '../../services/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent {
  selectedAccountId = '';
  transactions: any[] = [];

  constructor(
    private txService: TransactionService,
    public accountService: AccountService
  ) {}

  get accounts() {
    return this.accountService.getAllAccounts();
  }

  getAccountName(accountId: string): string {
    const account = this.accounts.find((acc) => acc.id === accountId);
    return account ? account.name : accountId; // fallback to ID if not found
  }

  onSelect(): void {
    this.transactions = this.txService.getTransactionsByAccount(
      this.selectedAccountId
    );
  }
}
