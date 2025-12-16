import { z } from "zod";

export const employeeZodSchema = z.object({
  // optional if it’s just for table display
  name: z.string().min(5, "Name must be at least 5 characters"),

  idNumber: z.string().min(4 / 10, "National ID / Iqama is required"), // Prisma field
  // optional UI field
  jobTitle: z.string().min(5, "Job Title must be at least 5 characters"),

  educationQualification: z.string("educationQualification").optional(),
  profilePhoto: z.string().nullable().optional(),
  group: z.string().min(10, "Group is required"), // Prisma field
  joiningDate: z.string().min(1, "Joining date is required"), // string to parse into Date
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  gender: z.enum(["MALE", "FEMALE"], "Must be select option"),
  status: z
    .enum(["ACTIVE", "INACTIVE", "TRANSFER", "VACATION"])
    .nullable()
    .optional(),

  nationality: z.string("Please Select The emolyee Nationlty"),
});

// Update  ZodeSchema here

export const updateEmployeeZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),

  email: z.string().email({ message: "Invalid email format" }).optional(),

  idNumber: z.string().optional(),

  group: z
    .string()
    .min(2, { message: "Department must be at least 2 characters" })
    .optional(),

  jobTitle: z
    .string()
    .min(2, { message: "jobTitle must be at least 2 characters" })
    .optional(),

  phoneNumber: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .optional(),

  gender: z
    .enum(["MALE", "FEMALE"], { message: "Gender must be MALE or FEMALE" })
    .optional(),

  isDeleted: z.boolean().optional(),

  createdAt: z.string().optional(),

  profilePhoto: z.string().nullable().optional(),

  id: z.string().optional(),
  title: z.string().optional(),
  icon: z.string().optional(),
});
