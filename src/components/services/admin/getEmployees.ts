import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEmployee } from "@/types/employee.interface";
import { updateEmployeeZodSchema } from "@/zod/employees.validation";

export async function getEmployees(queryString: string) {
  try {
    const response = await serverFetch.get("/employees");
    const result = await response.json();
    return result;
  } catch (error: unknown) {
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
// const token = userInfo();
export async function updateEmployees(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prevState: any,
  formData: FormData
) {
  try {
    const payload: Partial<IEmployee> = {
      name: formData.get("name") as string,
      idNumber: formData.get("idNumber") as string,
      nationality: formData.get("nationality") as string,
      jobTitle: formData.get("jobTitle") as string,
      educationQualification: formData.get("educationQualification") as string,
      gender: formData.get("gender") as "MALE" | "FEMALE",

      group: formData.get("group") as string,
    };
    const validatedPayload = zodValidator(
      payload,
      updateEmployeeZodSchema
    ).data;

    const response = await serverFetch.patch(`/employees/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
    const result = await response.json();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export async function softDeleteEmployee(id: string) {
  try {
    const response = await serverFetch.delete(`/employees/soft/${id}`);
    const result = await response.json();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
