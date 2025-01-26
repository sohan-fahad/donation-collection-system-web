/* eslint-disable @typescript-eslint/no-explicit-any */

import ENV from "@/ENV";
import { UtilsService } from "./utils.service";


interface IConfig {
    method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    body?: any;
    headers?: any;
}

interface IResponse<T> {
    data: T;
    status: number;
    headers: Headers;
}

export class HttpClient {
    private static baseUrl = ENV.baseUrl;

    private static async getAuthHeaders(config?: IConfig): Promise<IConfig> {
        const token = UtilsService.getToken()?.acToken ?? "";

        if (token) {
            config = {
                ...config,
                headers: {
                    ...config?.headers,
                    authorization: `Bearer ${token}`,
                },
            };
        }
        return config || {};
    }

    static async get<T>(path: string, config?: IConfig): Promise<IResponse<T>> {
        try {
            config = await this.getAuthHeaders(config);
            const response = await fetch(`${this.baseUrl}${path}`, { ...config, method: "GET" });
            const data: T = await response.json();
            return {
                data,
                status: response.status,
                headers: response.headers,
            };
        } catch (error) {
            throw new Error(error as any);
        }
    }

    static async post<T>(path: string, config: IConfig): Promise<IResponse<T>> {
        try {
            config = await this.getAuthHeaders(config);
            config.method = "POST";
            if (typeof config.body === "string") {
                config.headers = { ...config.headers, "Content-Type": "application/json" };
            }

            const response = await fetch(`${this.baseUrl}${path}`, { ...config });
            const data: T = await response.json();
            return {
                data,
                status: response.status,
                headers: response.headers,
            };
        } catch (error) {
            throw new Error(error as any);
        }
    }

    static async put<T>(path: string, config: IConfig): Promise<IResponse<T>> {
        try {
            config = await this.getAuthHeaders(config);
            config.method = "PUT";
            if (typeof config.body === "string") {
                config.headers = { ...config.headers, "Content-Type": "application/json" };
            }

            const response = await fetch(`${this.baseUrl}${path}`, { ...config });
            const data: T = await response.json();
            return {
                data,
                status: response.status,
                headers: response.headers,
            };
        } catch (error) {
            throw new Error(error as any);
        }
    }

    static async patch<T>(path: string, config: IConfig): Promise<IResponse<T>> {
        try {
            config = await this.getAuthHeaders(config);
            config.method = "PATCH";
            if (typeof config.body === "string") {
                config.headers = { ...config.headers, "Content-Type": "application/json" };
            }

            const response = await fetch(`${this.baseUrl}${path}`, { ...config });
            const data: T = await response.json();
            return {
                data,
                status: response.status,
                headers: response.headers,
            };
        } catch (error) {
            throw new Error(error as any);
        }
    }

    static async delete<T>(path: string, config?: IConfig): Promise<IResponse<T>> {
        try {
            config = await this.getAuthHeaders(config);
            config.method = "DELETE";

            const response = await fetch(`${this.baseUrl}${path}`, { ...config });
            const data: T = await response.json();
            return {
                data,
                status: response.status,
                headers: response.headers,
            };
        } catch (error) {
            throw new Error(error as any);
        }
    }
}