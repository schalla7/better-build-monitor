// header.component.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule
  ]
})
export class HeaderComponent {
  editMode: boolean = false;

  toggleSettings(): void {
    // Logic to open the settings modal
    console.log("Clicked on settings cog.")
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    console.log('Edit mode: ', this.editMode);
  }
}
