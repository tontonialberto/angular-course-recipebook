export class User {
    constructor(private _token: string, private _expirationDate: Date) {}

    public get token(): string {
        if(new Date() > this._expirationDate) {
            return null;
        }
        else {
            return this._token;
        }
    }
}