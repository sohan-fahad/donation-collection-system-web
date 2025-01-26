import { DonationEntity } from "@/presentation/types/entities";
import { IBaseResponse } from "@/presentation/types/interfaces";
import { HttpClient } from "../http.service";
import { UtilsService } from "../utils.service";
import { DonationSchemaType } from "@/presentation/schemas";

export class DonationApiService {

    public static async getAll(query?: { page?: number, limit?: number }): Promise<IBaseResponse<DonationEntity[]>> {
        try {
            query = { page: query?.page ?? 1, limit: query?.limit ?? 100 }
            const response = await HttpClient.get<IBaseResponse<DonationEntity[]>>(`/donations?${UtilsService.queryNormalizer(query)}`)

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async createDonation(data: DonationSchemaType) {
        try {
            const response = await HttpClient.post<IBaseResponse<DonationEntity>>(`/donations`, {
                body: JSON.stringify(data)
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async updateDonationStatus(id: string, status: string) {
        try {
            const response = await HttpClient.patch<IBaseResponse<DonationEntity>>(`/donations/${id}`, {
                body: JSON.stringify({ status })
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async delete(id: string) {
        try {
            const response = await HttpClient.delete<IBaseResponse<DonationEntity>>(`/donations/${id}`)

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}