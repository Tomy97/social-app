import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sparkles } from 'lucide-angular';
import { IconComponent } from '@shared/components/atoms/icon-component/icon-component';
@Component({
  selector: 'app-logo-component',
  imports: [IconComponent, NgClass],
  templateUrl: './logo-component.html',
})
export class LogoComponent {
  readonly sparkles = Sparkles;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() extraClass: string[] = [];

  get sizeClass(): string {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-9 w-9',
      lg: 'h-12 w-12',
    };
    return sizes[this.size];
  }

  get iconSize(): 'sm' | 'md' | 'lg' {
    return this.size;
  }
}
