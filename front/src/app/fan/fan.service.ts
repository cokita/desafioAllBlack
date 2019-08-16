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

    list(params):any {
      console.log('aaaaaaaaaa');
        return this.coreService.get(`fan`, params).pipe(map(res => res.data));
    }

    create(data):any{
        return this.coreService.post(`fan`, data,[])
            .pipe(map(result => result));
    }

    show(id,params):any{
        return this.coreService.get(`fan/`+id, params).pipe(map(res => res.data));
    }

    remove(id):any{
        return this.coreService.remove(`fan/`+id).pipe(map(res => res.data));
    }

    saveByFile(data):any{
        return this.coreService.post(`fan/save-by-file`, data,[]).pipe(map(res => res));
    }

    exportFans(data):any{
        return this.coreService.get(`fan/export`, data, true)
            .map(res => res.blob())
            .catch();
    }
}
