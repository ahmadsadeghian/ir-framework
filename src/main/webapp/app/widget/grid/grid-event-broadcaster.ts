import {EventEmitter, Injectable} from "@angular/core";
import {EventArgs} from "./grid-view-config";

@Injectable()
export class EventBroadcaster<T> {
    private eventEmitter: EventEmitter<EventArgs<T>> = new EventEmitter();

    public broadcast(e: EventArgs<T>) {
        this.eventEmitter.emit(e);
    }

    public subscribe(fn: (e: EventArgs<T>) => void) {
        this.eventEmitter.subscribe(fn);
    }

}

