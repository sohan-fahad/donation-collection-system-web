import { IBaseResponse } from "@/presentation/types/interfaces";
import { HttpClient } from "../http.service";
import { IAuthResponse } from "@/presentation/types/interfaces";
import { UserEntity } from "@/presentation/types/entities";
import { LoginSchemaType, RegistrationSchemaType } from "@/presentation/schemas";

export class AuthApiService {

    public static async login(payload: LoginSchemaType): Promise<IBaseResponse<IAuthResponse>> {
        try {
            const response = await HttpClient.post<IBaseResponse<IAuthResponse>>(`/auth/login`, {
                body: JSON.stringify(payload),
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async register(payload: RegistrationSchemaType): Promise<IBaseResponse<UserEntity>> {
        try {
            const response = await HttpClient.post<IBaseResponse<UserEntity>>(`/auth/register`, {
                body: JSON.stringify(payload),
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}