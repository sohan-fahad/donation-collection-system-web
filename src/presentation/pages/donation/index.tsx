"use client";

import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { Textarea } from "@/presentation/components/ui/textarea";
import {
  DonationGatewayEnum,
  DonationSchema,
  DonationSchemaType,
  DonationTypeEnum,
} from "@/presentation/schemas";
import { DonationApiService } from "@/presentation/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PaymentSuccessfull from "./PaymentSuccessfull";
import { useToast } from "@/presentation/hooks/use-toast";
import Text from "@/presentation/components/ui/text";
// import { UtilsService } from "@/presentation/services/utils.service";
// import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/components/context/auth-context";

export default function DonationPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // const router = useRouter();

  const { logout } = useAuth();

  const { toast } = useToast();

  const form = useForm<DonationSchemaType>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      amount: undefined,
      donorName: "",
      message: "",
      type: undefined,
      paymentGateway: undefined,
      transactionId: "",
    },
  });

  async function onSubmit(values: DonationSchemaType) {
    try {
      setError(null);
      const response = await DonationApiService.createDonation(values);

      if (response.success) {
        setIsSuccess(true);
        toast({
          title: "Donation Successful",
          description: "Thank you for your donation",
          duration: 2000,
        });
      } else {
        setError(response.message || "An error occurred during donation");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An error occurred during donation");
    }
  }

  // const logout = () => {
  //   UtilsService.removeToken();
  //   router.replace("/auth");
  // };

  return (
    <div className="w-full min-h-screen">
      {isSuccess ? (
        <PaymentSuccessfull setIsSuccess={setIsSuccess} />
      ) : (
        <div className="w-full flex justify-center flex-col items-center">
          <div className="bg-background shadow w-full">
            <div className="container mx-auto h-16 flex justify-between items-center">
              <Text variant="heading4">Donation System</Text>
              <div className="flex gap-2">
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <Card className="w-[450px] items-center mt-8">
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Support our cause with a generous contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="donorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Type*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select donation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(DonationTypeEnum).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentGateway"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Gateway</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment gateway" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(DonationGatewayEnum).map(
                              (gateway) => (
                                <SelectItem key={gateway} value={gateway}>
                                  {gateway}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transactionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Transaction ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                  >
                    {form.formState.isSubmitting ? "Processing..." : "Donate"}
                  </Button>
                </form>
              </Form>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
