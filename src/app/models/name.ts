export class Name {
    public constructor(init?: Partial<Name>) {
        Object.assign(this, init);
    }

    value: string = '';
    repeated: boolean = false;

}