import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { registerLocaleData  } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);  // <<-- L'important ici

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'candidature-tracker';
}
