import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AccountService } from '../../services/account.service';
import { SharedModule } from '../../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    SharedModule,
  ],
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent {
  accountForm: FormGroup;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      type: ['chequing'],
      balance: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.accountService.createAccount(this.accountForm.value);
      this.successMessage = ` Congratulations ${this.accountForm.value.name}, your ${this.accountForm.value.type} account has been successfully created 🎉`;

      this.accountForm.reset({ type: 'chequing' });
    }
  }

  goToTransfer() {
    this.router.navigate(['/transfer']);
  }

  get dynamicLabel(): string {
    const type = this.accountForm.get('type')?.value || '';
    return `Create ${type} account`;
  }

  get dynamicButtonClass(): string {
    const type = this.accountForm.get('type')?.value || 'default';
    return `btn-${type}`;
  }
}
