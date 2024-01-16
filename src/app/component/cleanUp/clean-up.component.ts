import {Component, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-clean-up',
    template: '',
})
export abstract class CleanUpComponent implements OnDestroy {
    protected $destroy = new Subject();

    ngOnDestroy() {
        this.$destroy.next(true);
        this.$destroy.complete();
    }
}
