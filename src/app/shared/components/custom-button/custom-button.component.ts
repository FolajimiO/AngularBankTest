import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: false,
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() label: string = 'Submit';
  @Input() accountType: string = 'chequing'; // Default to chequing

  get buttonClass(): string {
    return this.accountType === 'chequing' ? 'btn-chequing' : 'btn-savings';
  }
}
