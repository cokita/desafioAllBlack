import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {MaskDirective} from "./material/mask.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FilterPipeModule} from "ngx-filter-pipe";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
    declarations: [MaskDirective],
    imports: [
        CommonModule,
        MaterialModule,
        FilterPipeModule,
        NgxSpinnerModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        MaskDirective,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FilterPipeModule,
        NgxSpinnerModule
    ]
})
export class SharedModule {
}
