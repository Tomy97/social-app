import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.html',
  imports: [NgClass],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'follow' | 'link' = 'primary';
  @Input() size: 'full' | 'md' | 'sm' | 'icon' | 'modal' = 'md';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() extraClass: string[] = [];
  get classes(): string {
    if (this.variant === 'link') {
      return 'text-primary hover:underline transition-base text-sm';
    }

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
      icon: 'h-9 w-9 rounded-full flex items-center justify-center',
      modal: 'h-10 rounded-xl px-5 flex items-center justify-center gap-2',
    };

    const disabledClasses = this.disabled ? 'opacity-70 cursor-not-allowed pointer-events-none' : '';
    return `${variants[this.variant]} ${sizes[this.size]} ${disabledClasses} text-sm font-semibold transition-base`;
  }
}
