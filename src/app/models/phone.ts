export class Phone {
    public constructor(init?: Partial<Phone>) {
        Object.assign(this, init);
    }

    value: number = 0;
    repeated: boolean = false;

}