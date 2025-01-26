import { IBaseResponse, IReport } from "@/presentation/types/interfaces";
import { HttpClient } from "../http.service";

export class ReportApiService {

    public static async getAll(): Promise<IBaseResponse<IReport>> {
        try {
            const response = await HttpClient.get<IBaseResponse<IReport>>(`/donations/reports`)

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}