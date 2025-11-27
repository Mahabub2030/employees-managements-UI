import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEmployee } from "@/types/employee.interface";
import { Status } from "@/types/staus";
import { employeeZodSchema } from "@/zod/employees.validation";

export async function createEmployee(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prevState: any,
  formData: FormData
) {
  try {
    // Map FormData to IEmployee
    const payload: Partial<IEmployee> = {
      S_NO: formData.get("S_NO") as string,
      name: formData.get("name") as string,
      idNumber: formData.get("employeeId") as string,
      group: formData.get("department") as string,
      jobTitle: formData.get("jobTitle") as string,
      educationQualification: formData.get("educationQualification") as string,
      joiningDate: formData.get("joiningDate") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      gender: formData.get("gender") as "MALE" | "FEMALE",
      status: formData.get("status") as Status,
      isDeleted: false,
      profilePhoto: formData.get("profilePhoto") as string,
      nationality: formData.get("nationality") as string,
    };

    // Validate payload using Zod
    const validation = zodValidator(payload, employeeZodSchema);
    if (!validation.success) return validation;

    const validatedPayload = validation.data;

    // Prepare FormData for server
    const createFormData = new FormData();
    createFormData.append("data", JSON.stringify(validatedPayload));

    // Include file if uploaded
    if (formData.get("file")) {
      createFormData.append("file", formData.get("file") as Blob);
    }

    // POST request to server
    const response = await serverFetch.post("/employees", {
      body: createFormData,
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

    return { success: false, message };
  }
}
export async function updateEmployee(
  employeeId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prevState: any,
  formData: FormData
) {
  try {
    // Map FormData to IEmployee structure
    const payload: Partial<IEmployee> = {
      S_NO: formData.get("S_NO") as string,
      name: formData.get("name") as string,
      idNumber: formData.get("employeeId") as string,
      group: formData.get("department") as string,
      jobTitle: formData.get("jobTitle") as string,
      educationQualification: formData.get("educationQualification") as string,
      joiningDate: formData.get("joiningDate") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      gender: formData.get("gender") as "MALE" | "FEMALE",
      status: formData.get("status") as Status,
      profilePhoto: formData.get("profilePhoto") as string,
      nationality: formData.get("nationality") as string,
    };

    // Validate payload with Zod
    const validation = zodValidator(payload, employeeZodSchema);

    if (!validation.success) {
      return validation; // Return validation errors
    }

    const validatedPayload = validation.data;

    // Create FormData to send to server
    const updateFormData = new FormData();
    updateFormData.append("data", JSON.stringify(validatedPayload));

    // Include file if selected
    if (formData.get("file")) {
      updateFormData.append("file", formData.get("file") as Blob);
    }

    // Make PATCH request to update employee
    const response = await serverFetch.patch(`/employees/${employeeId}`, {
      body: updateFormData,
    });

    // Parse JSON response
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
export async function getEmployeesId(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/employeesId${queryString ? `?${queryString}` : ""}`
    );
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
