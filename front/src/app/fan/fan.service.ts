import { Injectable } from '@angular/core';
import {CoreService} from "../core.service";
import {MatSnackBar} from "@angular/material";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FanService {

  constructor(private coreService: CoreService, private snackBar: MatSnackBar, private router: Router) { }

    list():any {
      console.log('aaaaaaaaaa');
        return this.coreService.get(`fan`).pipe(map(res => res.data));
    }

    create(data):any{
        return this.coreService.post(`fan`, data,[]).subscribe(result => {
            this.snackBar.open('Fan Cadastrado com sucesso!', null, {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition:'right'
            });
        });
    }

    show(id,params):any{
        return this.coreService.get(`fan/`+id, params).pipe(map(res => res.data));
    }
}
