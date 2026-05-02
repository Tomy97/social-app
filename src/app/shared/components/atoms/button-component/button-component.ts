import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.html',
  imports: [NgClass],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'follow' = 'primary';
  @Input() size: 'full' | 'md' | 'sm' | 'icon' = 'md';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() extraClass: string[] = [];
  get classes(): string {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:brightness-110',
      secondary: 'border border-border bg-secondary text-foreground hover:border-primary/60',
      ghost: 'bg-secondary text-foreground hover:bg-secondary/70 border border-border',
      follow: 'bg-primary text-primary-foreground',
    };

    const sizes = {
      full: 'h-11 w-full rounded-full flex items-center justify-center gap-2',
      md: 'h-9 px-3 rounded-md',
      sm: 'h-7 px-3 rounded-full text-xs',
      icon: 'h-9 w-9 rounded-full',
    };

    return `${variants[this.variant]} ${sizes[this.size]} text-sm font-semibold transition-base`;
  }
}
