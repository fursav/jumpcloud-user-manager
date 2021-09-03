import { trigger, transition, query, style, group, animate } from "@angular/animations";

export const slider =
    trigger('routeAnimations', [
        transition(':increment', slideTo('right')),
        transition(':decrement', slideTo('left')),
    ]);

function slideTo(direction: string) {
    const optional = { optional: true };
    const sign = direction === "right" ? "" : "-";
    const leaveSign = sign === "-" ? '' : '-';
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                transform: 'translateX(0%)',
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({
                transform: `translateX(${sign}100%)`
            })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({ transform: `translateX(${leaveSign}100%)` }))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({ transform: 'translateX(0%)' }))
            ])
        ]),
    ];
}