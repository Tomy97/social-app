import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { IconFillDirective } from '@shared/directive/icon-fill.directive';

@Component({
  selector: 'app-post-action-button-component',
  imports: [LucideAngularModule, IconFillDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-action-button-component.html',
})
export class PostActionButtonComponent {
  @Input({ required: true }) icon!: LucideIconData;
  @Input() iconSize = 15;
  @Input() label: string | number | null = null;
  @Input() active = false;
  @Input() iconFillActive = 'none';
  @Input() activeClass = '';
  @Input() inactiveClass = '';
  @Input() baseClass = 'h-9 rounded-md px-3';
  @Output() pressed = new EventEmitter<void>();

  get classes(): string {
    const stateClass = this.active ? this.activeClass : this.inactiveClass;
    return `flex items-center gap-2 ${this.baseClass} transition-base focus:outline-none ${stateClass}`.trim();
  }

  get iconFill(): string {
    return this.active ? this.iconFillActive : 'none';
  }
}
