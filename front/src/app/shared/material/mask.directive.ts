import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
    selector: '[appMask]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MaskDirective,
        multi: true
    }]
})
export class MaskDirective implements ControlValueAccessor {

    onTouched: any;
    onChanges: any;

    @Input('appMask') appMask: string;

    constructor(private el: ElementRef) {
    }

    writeValue(value: any): void {
        if(value){
            (this.el.nativeElement as HTMLInputElement).value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChanges = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        var valor = $event.target.value.replace(/\D/g, '');
        var pad = this.appMask.replace(/\D/g, '').replace(/9/g, '_');
        var valorMask = valor + pad.substring(0, pad.length - valor.length);

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChanges(valor);
            return;
        }

        if (valor.length <= pad.length) {
            this.onChanges(valor);
        }

        var valorMaskPos = 0;
        valor = '';
        for (var i = 0; i < this.appMask.length; i++) {
            if (isNaN(parseInt(this.appMask.charAt(i)))) {
                valor += this.appMask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }
        $event.target.value = valor;
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.appMask.length) {
            return;
        }
        this.onChanges('');
        $event.target.value = '';
    }
}