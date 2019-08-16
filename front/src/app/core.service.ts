import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

import {ConstantsService} from './constants.service';

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    public options: object;
    public GC: ConstantsService;

    constructor(protected http: HttpClient,
                protected router: Router) {
        this.GC = new ConstantsService();
    }

    private setParamsOptions(object){
        this.options['params'] = new HttpParams({
            fromObject: object
        });
    }

    private getOptions(newHeader?, isBlob?){
        let headers = new HttpHeaders({'Accept': 'application/json'});
        if(this.getToken()){
            headers = headers.set('Authorization', 'Bearer ' + this.getToken());
        }
        if(newHeader && newHeader instanceof Array){
            newHeader.forEach(obj => {
                if(obj) {
                    headers = headers.set(obj.header, obj.value);
                }
            });
        }else{
            headers = headers.set('Content-Type', 'application/json');
        }
        this.options = { headers: headers, params: {}};

        let blob = null;
        if(isBlob){
            this.options['responseType'] = 'blob';
        }

        return this.options;
    }

    public post(url, data, headers?): Observable<any> {
        return this.http
            .post(`${this.GC.API_ENDPOINT}/${url}`, data, this.getOptions(headers));
    }

    public remove(url): Observable<any> {
        return this.http
            .delete(`${this.GC.API_ENDPOINT}/${url}`, this.options);
    }

    public get(url, object?, isBlob?): Observable<any> {

        return this.http
            .get(`${this.GC.API_ENDPOINT}/${url}`, this.getOptions(null, isBlob));
    }

    public update(url, object): Observable<any> {
        this.getOptions();
        this.setParamsOptions(object);

        return this.http
            .put(`${this.GC.API_ENDPOINT}/${url}`, this.options);
    }

    public getToken(){
        return null;
    }
}
