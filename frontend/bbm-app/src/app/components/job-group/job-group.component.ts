import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { IJobCard } from '../../interfaces/jobcard.interface';


@Component({
    selector: 'app-job-group',
    templateUrl: './job-group.component.html',
    styleUrls: ['./job-group.component.scss'],
    standalone: true,
    imports: [
        DragDropModule,
        NgIf,
        
    ]
})
export class JobGroupComponent {
    jobCards: IJobCard[] = [];
    private nextId = 0;
    
    // Adjust the drop method
    drop(event: CdkDragDrop<IJobCard[]>): void {
        moveItemInArray(this.jobCards, event.previousIndex, event.currentIndex);
    }
        
    // addCard(): void {
    //     const newCard: IJobCard = {
    //         id: this.getNextId(),
    //         label_title: 'New Job',
    //         label_description: 'Description of New Job',
    //         source_link: ' ',
            
    //     };
    //     this.jobCards.push(newCard);
    //     // Optionally set the newly added card as "active for editing"
    // }

    private getNextId(): number {
        return this.nextId++;
    }
}
    