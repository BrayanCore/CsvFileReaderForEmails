export class Address {
    public constructor(init?: Partial<Address>) {
        Object.assign(this, init);
    }

    value: string = '';
    repeated: boolean = false;
    valid: boolean = true;

}