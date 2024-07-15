import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, RouterOutlet]
})
export class AppComponent {

  title = 'YoutubeClientApp';
  
}