import { Component } from '@angular/core';
import { Sparkles, LucideAngularModule } from 'lucide-angular'

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule],
  templateUrl: './login.html',
})
export class Login {
  readonly sparkles = Sparkles;
}
