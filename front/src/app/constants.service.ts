import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

    public API_ENDPOINT: string;

    constructor() {
        this.API_ENDPOINT = environment.endpoint;

    }
}
