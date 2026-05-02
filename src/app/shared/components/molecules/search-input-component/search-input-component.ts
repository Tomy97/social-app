import { Component, Input } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { InputComponent } from '../../atoms/input-component/input-component';

@Component({
  selector: 'app-search-input-component',
  imports: [LucideAngularModule, InputComponent],
  templateUrl: './search-input-component.html',
})
export class SearchInputComponent {
  @Input() placeholder = 'Search SocialApp';

  readonly search = Search;
}
