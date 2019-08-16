import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    public API_ENDPOINT: string;
    public STATES: any;

    constructor() {
        this.API_ENDPOINT = environment.endpoint;
        this.STATES = [
            {id: 'AC', name: 'Acre'},
            {id: 'AL', name: 'Alagoas'},
            {id: 'AM', name: 'Amazonas'},
            {id: 'AP', name: 'Amapá'},
            {id: 'BA', name: 'Bahia'},
            {id: 'CE', name: 'Ceará'},
            {id: 'DF', name: 'Distrito Federal'},
            {id: 'ES', name: 'Espirito Santo'},
            {id: 'GO', name: 'Goias'},
            {id: 'MA', name: 'Maranhão'},
            {id: 'MG', name: 'Minas Gerais'},
            {id: 'MS', name: 'Mato Grosso do Sul'},
            {id: 'MT', name: 'Mato Grosso'},
            {id: 'PA', name: 'Pará'},
            {id: 'PB', name: 'Paraíba'},
            {id: 'PE', name: 'Pernambuco'},
            {id: 'PI', name: 'Piauí'},
            {id: 'PR', name: 'Paraná'},
            {id: 'RJ', name: 'Rio de Janeiro'},
            {id: 'RN', name: 'Rio Grande do Norte'},
            {id: 'RO', name: 'Rondônia'},
            {id: 'RR', name: 'Roraima'},
            {id: 'RS', name: 'Rio Grande do Sul'},
            {id: 'SC', name: 'Santa Catarina'},
            {id: 'SE', name: 'Sergipe'},
            {id: 'SP', name: 'São Paulo'},
            {id: 'TO', name: 'Tocantins'},

        ]
    }
}
