import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {MaskDirective} from "./material/mask.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FilterPipeModule} from "ngx-filter-pipe";
import {NgxSpinnerModule} from "ngx-spinner";
import { SendEmailComponent } from './modal/send-email/send-email.component';

@NgModule({
    declarations: [MaskDirective, SendEmailComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FilterPipeModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        MaskDirective,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FilterPipeModule,
        NgxSpinnerModule,
        SendEmailComponent
    ]
})
export class SharedModule {
}
