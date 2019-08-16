export class Address implements IAddress{
    public id?: number = null;
    public address?: string = null;
    public zipcode?: string = null;
    public neighborhood?: string = null;
    public city?: string = null;
    public state?: boolean = true;
    public active?: number = null;
    constructor() {}
}

export interface IAddress {
    id?: number,
    address?: string,
    zipcode?: string,
    neighborhood?: string,
    city?: string,
    state?: boolean,
    active?: number
}
