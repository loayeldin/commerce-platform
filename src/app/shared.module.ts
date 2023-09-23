import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DateFormatPipe } from "./date-format.pipe";

@NgModule({
    declarations :[  LoadingSpinnerComponent, DateFormatPipe],
    imports:[CommonModule,],
    exports:[
        LoadingSpinnerComponent,
        CommonModule,
        DateFormatPipe
    ]
})
export class SharedModule{}



