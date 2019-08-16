import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FanService} from "./fan.service";
import {FilterPipe} from "ngx-filter-pipe";
import {MatSnackBar, PageEvent} from "@angular/material";
import {Fan, IFan} from "../models/fan";
import {saveAs as importedSaveAs} from "file-saver";

@Component({
    selector: 'app-fan',
    templateUrl: './fan.component.html',
    styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
    @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
    public fans: any;
    public fanEdit: IFan = new Fan();
    public addFan: boolean = false;
    public fileUpload: any = null;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    resultUpload: any;
    pageEvent: PageEvent;

    constructor(private fanService: FanService, private filter: FilterPipe,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.getFans();
    }

    getFans(event?:PageEvent){
         let page = event || {pageIndex:0,pageSize:10}
         const params = Object.assign(page, {with: 'address', 'active': 1});
        console.log(params);
        this.fanService.list(params).subscribe(result => {
            this.fans = result;
            console.log(this.fans);
        })
    }



    receicerFan(newFan) {
        if(newFan) {
            if (this.fanEdit && newFan.id == this.fanEdit.id) {
                for (let count = 0, len = this.fans.data.length; count < len; count++) {
                    if (this.fans.data[count].id == newFan.id) {
                        this.fans.data[count] = newFan;
                    }
                }
            } else {
                this.fans.data.push(newFan);
                this.fans.total = this.fans.data.length;
            }
        }
        this.fanEdit = null;
        this.addFan = false;
    }

    edit(fan){
        this.addFan = true;
        this.fanEdit = fan;
    }

    removeFan(fan){
        this.fanService.remove(fan.id).subscribe(result => {
            this.fans.data = this.fans.data.filter(fanE => fanE.id !== fan.id);
            this.snackBar.open('Torcedor removido com sucesso!', null, {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
            });
        });
    }

    onFileChange(event) {
        if(event.target.files.length > 0) {
            let file = event.target.files[0];
            this.fileUpload = file;
            this.handleFileSelected(file);
            console.log(this.fileUpload);
            const reader = new FileReader();
            // reader.onload = e => this.imagePreviewSrc = reader.result;
            reader.readAsDataURL(file);
        }
    }

    handleFileSelected(file) {
        const size = file.size;
        if (size < 1000) {
            this.fileUpload.newsize = size;
            this.fileUpload.unit = "bytes";
        } else if (size < 1000*1000) {
            this.fileUpload.newsize = size / 1000;
            this.fileUpload.unit = "kb";
        } else if (size < 1000*1000*1000) {
            this.fileUpload.newsize = size / 1000 / 1000;
            this.fileUpload.unit = "mb";
        } else {
            this.fileUpload.newsize = size / 1000 /1000 /1000;
            this.fileUpload.unit = "gb";
        }
    }

    cancelUpload(){
        this.fileUpload = null;
        if (this.fileInput && this.fileInput.nativeElement) { // this validation fixes the issue
            this.fileInput.nativeElement.value = '';
        }
    }

    upload(){
        const formData = new FormData();
        formData.append('file', this.fileUpload);
        this.fanService.saveByFile(formData).subscribe(result => {
            this.resultUpload = result;
            this.getFans();
            this.cancelUpload();
        });
    }

    exportFans() {
        this.fanService.exportFans({}).subscribe(blob => {
            importedSaveAs(blob, 'teste.csv');
        });
    }

}
