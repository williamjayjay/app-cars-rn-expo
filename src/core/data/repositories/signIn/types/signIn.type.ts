interface SignInParamsRequest {
    user?: string;
    password?: string;
}

interface SignInUserResponse {
    id: number;
    name: string;
    token: string;
}

interface SignInResponseApi {
    error: boolean;
    user: SignInUserResponse
    message?: string;
}

export { SignInParamsRequest, SignInResponseApi }