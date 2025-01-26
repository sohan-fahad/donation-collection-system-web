import { UserEntity } from "../entities/user.entity";

export interface IAuthResponse {
    token: string;
    refreshToken: string
    user: UserEntity;
}