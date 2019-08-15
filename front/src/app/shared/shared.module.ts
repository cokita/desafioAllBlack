import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {MaskDirective} from "./material/mask.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [MaskDirective],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        MaskDirective,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class SharedModule {
}
