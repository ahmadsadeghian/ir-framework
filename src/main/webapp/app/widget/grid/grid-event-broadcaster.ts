import {EventEmitter, Injectable} from "@angular/core";
import {EventArgs} from "./grid-view-config";

@Injectable()
export class EventBroadcaster {
    private eventEmitter: EventEmitter<EventArgs> = new EventEmitter();

    public broadcast(e: EventArgs) {
        this.eventEmitter.emit(e);
    }

    public subscribe(fn: (e: EventArgs) => void) {
        this.eventEmitter.subscribe(fn);
    }

}

