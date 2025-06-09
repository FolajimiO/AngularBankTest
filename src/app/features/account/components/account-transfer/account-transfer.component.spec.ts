import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransferComponent } from './account-transfer.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('AccountTransferComponent', () => {
  let component: AccountTransferComponent;
  let fixture: ComponentFixture<AccountTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTransferComponent, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
