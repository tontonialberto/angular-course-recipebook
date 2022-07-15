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

    public static fromRaw(obj: object): User {
        const _token = obj['_token'] ? obj['_token'] : null;
        const _expirationDate = obj['_expirationDate'] ? obj['_expirationDate'] : null;
        return new User(_token, new Date(_expirationDate));
    }
}