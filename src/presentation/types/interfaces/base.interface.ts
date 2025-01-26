export interface IBaseResponse<T> {
    data: T;
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
        count: number;
        limit: number;
        page: number;
        total: number;
    };
}