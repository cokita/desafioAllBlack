import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private coreService: CoreService, private snackBar: MatSnackBar) { }

  sendEmailFan(data): any {
    return this.coreService.post(`mail/send-mail-fan`, data, [])
      .subscribe(result => {
        this.snackBar.open('E-mails enviados com sucesso.', null, {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }

  sendEmailAll(data): any {
    return this.coreService.post(`mail/send`, data, [])
      .subscribe(result => {
        let msg = 'E-mails enviados com sucesso.';
        if(result.status == 'error'){
          msg = 'Ops! '+result.data.errors.length+' e-mail(s) não pode(uderam) ser enviado(s).';
        }
        this.snackBar.open(msg, null, {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }
}
