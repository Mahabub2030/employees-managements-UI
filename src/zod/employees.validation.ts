import { z } from "zod";

export const employeeZodSchema = z.object({
  S_NO: z.string().min(1, "S_NO is required").optional(), // optional if it’s just for table display
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  employeeId: z.string().min(1, "Employee ID is required"),
  idNumber: z.string().min(1, "National ID / Iqama is required"), // Prisma field
  department: z.string().min(2, "Department must be at least 2 characters"), // optional UI field
  group: z.string().min(2, "Group is required"), // Prisma field
  jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
  educationQualification: z.string().optional(),
  joiningDate: z.string().min(1, "Joining date is required"), // string to parse into Date
  phoneNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  salary: z.string().optional(), // optional UI field
  gender: z.enum(["MALE", "FEMALE"]),
  status: z
    .enum(["ACTIVE", "INACTIVE", "TANSFAR", "VACATION"])
    .default("ACTIVE"),
  profilePhoto: z.string().optional(),
  nationality: z.string().optional(),
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
