import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from './toggle.component';

@NgModule({
  declarations: [BannerComponent, ToggleComponent],
  exports: [BannerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class BannerModule {}
