import { z } from "zod";

export const employeeZodSchema = z.object({
  S_NO: z.string().min(1, "S_NO is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  employeeId: z.string().min(1, "Employee ID is required"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  salary: z.string().min(1, "Salary is required"),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Gender must be either MALE or FEMALE",
  }),
  isDeleted: z.boolean().default(false),
  createdAt: z.string().optional(), // ISO Date string
  profilePhoto: z.string().url("Invalid photo URL").optional(),
  id: z.string().min(1, "ID is required"),
  title: z.string().optional(),
  icon: z.string().optional(),
});

// Update  ZodeSchema here

export const updateEmployeeZodSchema = z.object({
  S_NO: z.string().optional(),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),

  email: z.string().email({ message: "Invalid email format" }).optional(),

  employeeId: z.string().optional(),

  department: z
    .string()
    .min(2, { message: "Department must be at least 2 characters" })
    .optional(),

  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters" })
    .optional(),

  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .optional(),

  salary: z.string().optional(),

  gender: z
    .enum(["MALE", "FEMALE"], { message: "Gender must be MALE or FEMALE" })
    .optional(),

  isDeleted: z.boolean().optional(),

  createdAt: z.string().optional(),

  profilePhoto: z.string().url({ message: "Invalid photo URL" }).optional(),

  id: z.string().optional(),
  title: z.string().optional(),
  icon: z.string().optional(),
});
