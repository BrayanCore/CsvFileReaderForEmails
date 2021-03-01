import { Address } from "./address";
import { Name } from "./name";
import { Phone } from "./phone";

export class Email {
    public constructor(init?: Partial<Email>) {
        Object.assign(this, init);
    }

    name: Name = new Name();
    address: Address = new Address();
    phone: Phone = new Phone();
    repeated: boolean = false;

}