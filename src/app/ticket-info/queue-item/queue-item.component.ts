import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { TicketInfoService } from '../ticket-info.service';
import { QueueEntity } from '../../entities/queue.entity';


@Component({
  selector: 'app-queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.css', '../../shared/css/common-styles.css']
})
export class QueueItemComponent {

    @Input() public queueName: string;
    @Input() public visitPosition: number;
    @Input() public waitingVisits: number;
    @Input() public index: number;
    public queueEntity: QueueEntity;

    constructor(private ticketService: TicketInfoService) {
    }

    public hilightSelctedPosition(): boolean {
        if (this.index === this.visitPosition) {
            return true;
        }
        return false;
    }

    public getQueueIndex(): any {
        if (this.hilightSelctedPosition()) {
            return this.ordinal_suffix_of(this.index);
        }
        return this.trimIndex(this.index);
    }

    public trimIndex(index: number): any {
        if (index && index.toString().length > 3) {
            let a = index.toString().substr((index.toString().length - 2), (index.toString().length));
            return '.' + a;
        }
        return index;
    }

    public ordinal_suffix_of(i) {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return this.trimIndex(i) + 'st';
        }
        if (j === 2 && k !== 12) {
            return this.trimIndex(i) + 'nd';
        }
        if (j === 3 && k !== 13) {
            return this.trimIndex(i) + 'rd';
        }
        return this.trimIndex(i) + 'th';
    }

}
