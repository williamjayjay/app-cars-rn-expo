import { SignInParamsRequest, SignInResponseApi } from "../types/signIn.type";

interface ISignInRepositoryInterface {
    postUserData({ user, password }: SignInParamsRequest): Promise<SignInResponseApi>;
}

export { ISignInRepositoryInterface }