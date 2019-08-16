import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FanService} from "../fan.service";
import {MatSnackBar} from "@angular/material";
import {ConstantsService} from "../../constants.service";
import {Fan} from "../../models/fan";

@Component({
    selector: 'app-fan-create',
    templateUrl: './fan-create.component.html',
    styleUrls: ['./fan-create.component.scss']
})
export class FanCreateComponent implements OnInit {
    @Output() fanOutput = new EventEmitter();

    states: any;
    private _fan = new Fan();
    fanForm: FormGroup;
    validateFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef, private fanService: FanService,
                private snackBar: MatSnackBar, private constants: ConstantsService) {
    }

    ngOnInit() {}

    inicialize(){
        this.states = this.constants.STATES;
        this.fanForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            document: ['', Validators.required],
            email: ['', [Validators.email]],
            phone: [''],
            address: this.formBuilder.group({
                id: [''],
                address: ['', Validators.required],
                zipcode: ['', Validators.required],
                neighborhood: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
            })
        });
    }
    @Input()
    set fan(fan) {
        if(!this.fanForm){
            this.inicialize();
        }

        if (fan !== null) {
            this._fan = fan;
        }

        this.fanForm.patchValue(this._fan);
    }



    get f() {
        return this.fanForm.controls;
    }

    save() {
        this.fanService.create(this.fanForm.value).subscribe(result => {
            this.snackBar.open('Fan Cadastrado com sucesso!', null, {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
            });

            this.fanOutput.emit(result.data);
        });
    }

    close(){
        this.fanOutput.emit(null);
    }

}
