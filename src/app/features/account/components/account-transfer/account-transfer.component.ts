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
