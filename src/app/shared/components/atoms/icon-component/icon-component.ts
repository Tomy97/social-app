import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
@Component({
  selector: 'app-icon-component',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './icon-component.html',
})
export class IconComponent {
  @Input() icon!: LucideIconData;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() extraClass: string[] = ['text-primary-foreground'];

  get getSize(): number {
    const sizes = {
      sm: 14,
      md: 15,
      lg: 24,
    };
    return sizes[this.size];
  }
}
