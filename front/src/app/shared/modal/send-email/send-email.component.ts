import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SendEmailService } from './send-email.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  mailForm: FormGroup;
  validateFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
  ]);
  constructor(public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private sendMailService:SendEmailService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mailForm = this.formBuilder.group({
      fan_id: [''],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMail(){
    if(this.data.fan && this.data.fan.id){
      this.mailForm.controls['fan_id'].setValue(this.data.fan.id);
      this.sendMailService.sendEmailFan(this.mailForm.value);
    }else{
      this.sendMailService.sendEmailAll(this.mailForm.value);
    }
    this.dialogRef.close();
  }
}
