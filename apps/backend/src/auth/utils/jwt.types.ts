export enum JwtSubjectType {
    ACCESS = 'ACCESS',
}

export type JwtDecodedData = {
    sub: JwtSubjectType;
    username: string;
    iat: number;
    nbf: number;
    exp: number;
    aud: string;
    iss: string;
};
