import {Address, IAddress} from "./address";

export class Fan implements IFan{
    public id: number = null;
    public name: string = null;
    public document: string = null;
    public email?: string = null;
    public phone?: string = null;
    public active?: boolean = true;
    public address_id?: number = null;
    public address? = new Address();
    constructor() {}
}

export interface IFan {
    id: number,
    name: string,
    document: string,
    email?: string,
    phone?: string,
    active?: boolean,
    address_id?: number,
    address?: Address
}
