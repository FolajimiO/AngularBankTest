import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { AccountService } from './features/account/services/account.service';
import { Observable, map } from 'rxjs';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    AsyncPipe,
    NgIf,
    SharedModule,
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  hasAccounts$!: Observable<boolean>;

  constructor(private accountService: AccountService) {
    this.hasAccounts$ = this.accountService.accounts$.pipe(
      map((accounts) => accounts.length > 0)
    );
  }
}
