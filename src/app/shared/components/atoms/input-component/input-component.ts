import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-component',
  imports: [],
  templateUrl: './input-component.html',
})
export class InputComponent {
  @Input() id = '';
  @Input() type: 'text' | 'email' | 'password' | 'search' = 'text';
  @Input() placeholder = '';
  @Input() variant: 'default' | 'search' | 'composer' = 'default';
  @Input() extraClass: string[] = [];

  get classes(): string {
    const variants = {
      default:
        'h-11 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-base focus:border-primary focus:ring-2 focus:ring-primary/30',
      search:
        'h-10 w-full rounded-full border border-border bg-background/85 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-base focus:border-primary focus:ring-2 focus:ring-primary/30',
      composer:
        'h-10 flex-1 rounded-xl border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-base focus:border-primary',
    };

    return `${variants[this.variant]} ${this.extraClass.join(' ')}`.trim();
  }
}
