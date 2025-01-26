import { z } from 'zod';

export enum DonationTypeEnum {
  ONE_TIME = 'one-time',
  RECURRING = 'recurring'
}

export enum DonationGatewayEnum {
  BKASH = 'bkash',
  NAGAD = 'nagad',
  CARD = 'card',
  BANK = 'bank',
}

export enum DonationStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}


// Registration Schema
export const RegistrationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }).trim().min(1, { message: 'Name cannot be empty' }),

  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email({ message: 'Invalid email format' }),

  phoneNumber: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a string'
  }).min(11, { message: 'Invalid Phone number format' }),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(6, { message: 'Password must be at least 6 characters long' })
});

// Login Schema
export const LoginSchema = z.object({
  phoneNumber: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a string'
  }).min(11, { message: 'Invalid Phone number format' }),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(6, { message: 'Password must be at least 6 characters long' })
});


export const DonationSchema = z.object({
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).min(1, { message: 'Amount must be a positive number' }),

  donorName: z.string({
    required_error: 'Donor name is required',
    invalid_type_error: 'Donor name must be a string'
  }).trim().min(1, { message: 'Donor name cannot be empty' }),

  message: z.string({
    required_error: 'Message is required',
  }).optional(),

  type: z.nativeEnum(DonationTypeEnum, {
    required_error: 'Donation type is required',
    invalid_type_error: 'Invalid donation type'
  }),

  paymentGateway: z.nativeEnum(DonationGatewayEnum, {
    required_error: 'Payment gateway is required',
    invalid_type_error: 'Invalid payment gateway'
  }),

  transactionId: z.string({
    required_error: 'Transaction ID is required',
    invalid_type_error: 'Transaction ID must be a string'
  }).trim().min(1, { message: 'Transaction ID cannot be empty' }),
});

export const UpdateDonationSchema = z.object({
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).min(1, { message: 'Amount must be a positive number' }),


  status: z.nativeEnum(DonationStatusEnum, {
    required_error: 'Donation type is required',
    invalid_type_error: 'Invalid donation type'
  }),
});

// Type inference for TypeScript
export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type DonationSchemaType = z.infer<typeof DonationSchema>;
export type UpdateDonationSchemaType = z.infer<typeof UpdateDonationSchema>;
