import { Service } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Service()

export class OrderModal{
    public selectedOrder$ = new BehaviorSubject<any>(null);

    open(order:any) void {
         this.selectedOrder$.next(order);
    }

    close(): void{
        this.selectedOrder$.next(null);
    }
   
}