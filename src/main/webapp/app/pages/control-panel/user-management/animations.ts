import { trigger, state, transition, animate, style } from '@angular/core';

export class Animations {
    public static slideInOut = trigger('slideInOut', [
        state('true', style({ height: '0px' })),
        state('false', style({ height: '*' })),
        transition('1 => 0', animate('500ms ease-in')),
        transition('0 => 1', animate('500ms ease-out'))
    ]);
}