import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-account-transfer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './account-transfer.component.html',
  styleUrls: ['./account-transfer.component.scss'],
})
export class AccountTransferComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private txService: TransactionService
  ) {
    this.form = this.fb.group(
      {
        from: ['', Validators.required],
        to: ['', Validators.required],
        amount: [null, [Validators.required, Validators.min(1)]],
      },
      {
        validators: [
          this.accountsNotSameValidator,
          this.balanceSufficientValidator.bind(this),
        ],
      }
    );
  }

  get accounts() {
    return this.accountService.getAllAccounts();
  }

  accountsNotSameValidator(group: AbstractControl): ValidationErrors | null {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;
    return from && to && from === to ? { sameAccount: true } : null;
  }

  balanceSufficientValidator(group: AbstractControl): ValidationErrors | null {
    const fromId = group.get('from')?.value;
    const amount = group.get('amount')?.value;
    const fromAcc = this.accountService.getAccountById(fromId);

    if (!fromAcc || amount == null) return null;
    return amount > fromAcc.balance ? { insufficientFunds: true } : null;
  }

  onTransfer() {
    this.form.markAllAsTouched(); // Show validation messages
    if (this.form.invalid) return;

    const { from, to, amount } = this.form.value;

    const fromAcc = this.accountService.getAccountById(from);
    const toAcc = this.accountService.getAccountById(to);

    if (!fromAcc || !toAcc) return;

    fromAcc.balance -= amount;
    toAcc.balance += amount;

    this.accountService.updateAccount(fromAcc);
    this.accountService.updateAccount(toAcc);

    this.txService.recordTransaction({
      fromAccountId: from,
      toAccountId: to,
      amount,
    });

    this.form.reset();
  }
}

//Template-driven Form implementation
/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account-transfer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './account-transfer.component.html',
  styleUrls: ['./account-transfer.component.scss'],
})
export class AccountTransferComponent {
  from: string = '';
  to: string = '';
  amount: number | null = null;

  error: string = '';

  constructor(
    private accountService: AccountService,
    private txService: TransactionService
  ) {}

  get accounts() {
    return this.accountService.getAllAccounts();
  }

  onTransfer(formValid: boolean) {
    this.error = '';
    if (!formValid || this.amount == null || this.from === this.to) {
      this.error = 'Invalid form. Please check your inputs.';
      return;
    }

    const fromAcc = this.accountService.getAccountById(this.from);
    const toAcc = this.accountService.getAccountById(this.to);

    if (!fromAcc || !toAcc) return;

    if (this.amount > fromAcc.balance) {
      this.error = 'Insufficient funds in source account.';
      return;
    }

    fromAcc.balance -= this.amount;
    toAcc.balance += this.amount;

    this.accountService.updateAccount(fromAcc);
    this.accountService.updateAccount(toAcc);

    this.txService.recordTransaction({
      fromAccountId: this.from,
      toAccountId: this.to,
      amount: this.amount,
    });

    this.amount = null;
    this.from = '';
    this.to = '';
  }
}

  
*/
