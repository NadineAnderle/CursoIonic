import { FormControl } from "@angular/forms";

export class CursoIonicValidadores{
    public static email(fc:FormControl):any{
        let emailRegex : RegExp= /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;
    }
}