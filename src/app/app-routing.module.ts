import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './features/account/components/account-creation/account-creation.component';
import { AccountTransferComponent } from './features/account/components/account-transfer/account-transfer.component';
import { TransactionHistoryComponent } from './features/account/components/transaction-history/transaction-history.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'create', component: AccountCreationComponent },
  { path: 'transfer', component: AccountTransferComponent },
  { path: 'history', component: TransactionHistoryComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full' },
];

export const appRoutingProviders = [
  importProvidersFrom(
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ),
];

export const appRouting = provideRouter(routes);
