import { IEmployee } from "./employee.interface";

export type IEmployeeCreate = Omit<IEmployee, "id" | "createdAt" | "updatedAt">;
