/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { IReport } from "@/presentation/types/interfaces";
import { ReportApiService } from "@/presentation/services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data - replace with actual data fetching logic
const mockDonations = [
  {
    id: 1,
    name: "John Doe",
    amount: 100,
    date: "2023-06-01",
    campaign: "General Fund",
  },
  {
    id: 2,
    name: "Jane Smith",
    amount: 250,
    date: "2023-06-02",
    campaign: "Building Project",
  },
  {
    id: 3,
    name: "Bob Johnson",
    amount: 50,
    date: "2023-06-03",
    campaign: "Food Drive",
  },
  {
    id: 4,
    name: "Alice Brown",
    amount: 500,
    date: "2023-06-04",
    campaign: "General Fund",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    amount: 150,
    date: "2023-06-05",
    campaign: "Building Project",
  },
];

export default function DonationReport() {
  const [timeRange, setTimeRange] = useState("This Month");
  const [reportData, setReportData] = useState<IReport | null>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const totalDonations = mockDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );
  const averageDonation = totalDonations / mockDonations.length;

  const barChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Donations",
        data: [1200, 1900, 3000, 5000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const fetchReport = async () => {
    const response = await ReportApiService.getAll();

    if (response.success) {
      setReportData(response.data);
    } else {
      setReportData(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Donation Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${reportData?.totalAmount ?? 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportData?.totalDonations ?? 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Donation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {reportData?.totalAmount && reportData?.totalDonations
                ? (
                    Number(reportData.totalAmount) /
                    Number(reportData.totalDonations)
                  ).toFixed(2)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Donations Over Time via Gateway</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels:
                  reportData?.donationsByGateway.map((item) => item.gateway) ??
                  [],
                datasets: [
                  {
                    label: "Gateway",
                    data:
                      reportData?.donationsByGateway.map(
                        (item) => +item.total
                      ) ?? [],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={(reportData?.topDonors as any) ?? []}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
