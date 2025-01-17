import { createClientHttpWithUrl } from "@/core/services/client-http";
import { handleError } from "@/core/utils/handleError";
import { SignInParamsRequest, SignInResponseApi } from "./types/signIn.type";
import { ISignInRepositoryInterface } from "./interface/ISignIn";

class SignInRepository implements ISignInRepositoryInterface {
  customApiUrl: string;
  customParam: string;

  constructor({
    customApiUrl,
    customParam,
  }: {
    customApiUrl?: string;
    customParam?: string;
  }) {
    this.customApiUrl = customApiUrl || '';
    this.customParam = customParam || '';
  }

  async postUserData({
    user = "",
    password = "",
  }: SignInParamsRequest): Promise<SignInResponseApi> {
    const url = `https://${this.customApiUrl}${this.customParam}`;

    const customClient = createClientHttpWithUrl(url);

    try {
      const response = await customClient.post<SignInResponseApi>("", {
        user: user,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.error("Error during sign-in process:", error);
      throw handleError(error);
    }
  }
}

export { SignInRepository };
