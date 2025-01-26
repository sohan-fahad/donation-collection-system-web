/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/presentation/components/ui/button";
import Text from "@/presentation/components/ui/text";
import { UtilsService } from "@/presentation/services/utils.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DonationEntity } from "@/presentation/types/entities";
import { DonationApiService } from "@/presentation/services/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/presentation/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DonationStatusEnum } from "@/presentation/schemas";
import { ChevronDown, DeleteIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/presentation/hooks/use-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/components/ui/popover";

export default function DonationListPage() {
  const [donations, setDonations] = useState<DonationEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDonation, setSelectedDonation] =
    useState<DonationEntity | null>(null);
  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      const response = await DonationApiService.getAll();
      setDonations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);

      const response = await DonationApiService.delete(id);

      if (response?.success) {
        toast({
          title: "Donation Deleted",
          description: "Donation deleted successfully",
          duration: 2000,
        });
        await fetchCurrencies();
      } else {
        toast({
          title: response?.message || "Status Deletion Failed",
          description: "Donation deleted  failed",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Status Deletion Failed",
        description: "Donation deleted  failed",
        duration: 2000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container mx-auto bg-white mt-4">
          <div>
            {loading ? (
              <div className="flex justify-center p-4">Loading...</div>
            ) : (
              <Table>
                <TableCaption>A list of your donation.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations?.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">
                        {donation?.donorName ?? donation?.donor?.name ?? "N/A"}
                      </TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>{donation.paymentGateway}</TableCell>
                      <TableCell>{donation.transactionId}</TableCell>

                      <TableCell>
                        {UtilsService.dateFormat(
                          donation.createdAt,
                          "hh:mm A, ddd MM YYYY"
                        )}
                      </TableCell>
                      <TableCell>
                        {UtilsService.dateFormat(
                          donation.updatedAt,
                          "hh:mm A, ddd MM YYYY"
                        )}
                      </TableCell>
                      <TableCell>
                        <DonationStatus
                          id={donation?.id}
                          status={donation?.status}
                        />
                      </TableCell>

                      <TableCell>
                        <Popover>
                          <PopoverTrigger>
                            <Trash2Icon size={16} />
                          </PopoverTrigger>
                          <PopoverContent>
                            <div>
                              <Text variant="heading5">Are you sure?</Text>
                              <Text variant="body">
                                You want to delete this donation?
                              </Text>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button
                                variant="destructive"
                                disabled={isDeleting}
                                onClick={() => {
                                  handleDelete(donation.id);
                                }}
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
      {/* <Dialog open={Boolean(selectedDonation?.id)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You want to delete this donation?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <div className="flex gap-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <Popover open={Boolean(selectedDonation?.id)}>
        <PopoverContent>
          <div>
            <Text variant="heading5">Are you sure?</Text>
            <Text variant="body">You want to delete this donation?</Text>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

const DonationStatus = ({ id, status }: { id: string; status: string }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleStatusChange = async (status: string) => {
    try {
      setIsLoading(true);

      const response = await DonationApiService.updateDonationStatus(
        id,
        status
      );

      if (response?.success) {
        toast({
          title: "Status Updated",
          description: "Donation status updated successfully",
          duration: 2000,
        });
        setCurrentStatus(status);
      } else {
        toast({
          title: response?.message || "Status Update Failed",
          description: "Donation status updated failed",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Status Update Failed",
        description: "Donation status updated failed",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? "Updating..." : currentStatus} <ChevronDown size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white border">
        <DropdownMenuRadioGroup
          value={currentStatus}
          onValueChange={handleStatusChange}
        >
          {Object.values(DonationStatusEnum).map((type) => (
            <DropdownMenuRadioItem key={type} value={type}>
              {type}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
