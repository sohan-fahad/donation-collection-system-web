import { UserEntity } from "./user.entity"

export type DonationEntity = {
    id: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    amount: string
    donorName: string
    message: string
    type: string
    status: string
    isAnonymous: boolean
    transactionId: string
    paymentGateway: string
    donor: UserEntity
}


