import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [CustomButtonComponent]
})
export class SharedModule {}
