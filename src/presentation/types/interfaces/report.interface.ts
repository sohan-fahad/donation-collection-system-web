export interface IReport {
    totalDonations: number
    totalAmount: string
    donationsByGateway: DonationsByGateway[]
    topDonors: TopDonor[]
}

export interface DonationsByGateway {
    gateway: string
    total: string
}

export interface TopDonor {
    name: string
    amount: string
}