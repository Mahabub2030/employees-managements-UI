import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEmployee } from "@/types/employee.interface";
import { employeeZodSchema } from "@/zod/employees.validation";

export async function creatEmployee(_prevState: any, formData: FormData) {
  try {
    const payload: IEmployee = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      employeeId: formData.get("employeeId") as string,
      department: formData.get("department") as string,
    };
    if (zodValidator(payload, employeeZodSchema).success === false) {
      return zodValidator(payload, employeeZodSchema);
    }
    const validatedPayload = zodValidator(payload, employeeZodSchema).data;

    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }
    const newPayload = {
      password: validatedPayload.password,
      admin: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        IdNumber: validatedPayload.IdNumber,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    const response = await serverFetch.post("/employees", {
      body: newFormData,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : String(error)
        : "Something went wrong";
    return {
      success: false,
      message,
    };
  }
}

export async function getEmployees(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/employees${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
export async function getEmployeesId(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/employeesId${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
