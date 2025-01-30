/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import updateLocale from 'dayjs/plugin/updateLocale';
import { IUserRole } from "../types/interfaces";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);

export class UtilsService {
    public static queryNormalizer = (options: any): string => {
        const items: any = {};
        Object.keys(options).map((x) => {
            if (options[x]) {
                items[x] = options[x];
            }
        });
        return Object.keys(items)
            .map((x) => {
                return items[x] && `${x}=${encodeURIComponent(items[x])}`;
            })
            .join("&");
    };

    public static dateFormat(date: any, format: string) {
        return dayjs(date).format(format)
    }

    public static debounce = (cb: any, wait: number) => {
        let timeout: NodeJS.Timeout;
        return function (...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => cb(...args), wait);
        };
    }

    public static truncateText(text: string, maxLength: number = 25): string {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    public static getToken = () => {
        return JSON.parse(localStorage.getItem('auth_token') || '{}') as { acToken: string };
    }

    public static setToken = (tokens: { acToken: string }) => {
        localStorage.setItem('auth_token', JSON.stringify(tokens));
    }

    public static removeToken = () => {
        localStorage.removeItem('auth_token');
    }

    static setRole(role: string) {
        localStorage.setItem('userRole', role);
    }

    static getRole() {
        const role = localStorage.getItem('userRole');
        return role as IUserRole["role"];
    }

    static removeRole() {
        localStorage.removeItem('userRole');
    }
}