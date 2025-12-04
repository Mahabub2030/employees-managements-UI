import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEmployee } from "@/types/employee.interface";
import { employeeZodSchema } from "@/zod/employees.validation";

export async function createEmployee(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prevState: any,
  formData: FormData
) {
  try {
    // Map FormData to IEmployee
    const validationPayload: Partial<IEmployee> = {
      name: formData.get("name") as string,
      idNumber: formData.get("idNumber") as string,
      group: formData.get("group") as string,
      jobTitle: formData.get("jobTitle") as string,
      educationQualification: formData.get("educationQualification") as string,
      joiningDate: formData.get("joiningDate") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      gender: formData.get("gender") as "MALE" | "FEMALE",
      status: formData.get("status") as string,
      profilePhoto: formData.get("profilePhoto") as string,
      nationality: formData.get("nationality") as string,
    };

    const validatedPayload = zodValidator(validationPayload, employeeZodSchema);

    // Validation failed
    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Validation failed",
        formData: validationPayload,
        errors: validatedPayload.errors,
      };
    }

    // Ensure data exists
    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: validationPayload,
      };
    }

    const backendPayload = {
      employees: {
        name: validatedPayload.data.name,
        idNumber: validatedPayload.data.idNumber,
        group: validatedPayload.data.group,
        jobTitle: validatedPayload.data.jobTitle,
        educationQualification: validatedPayload.data.educationQualification,
        joiningDate: validatedPayload.data.joiningDate,
        email: validatedPayload.data.email,
        phoneNumber: validatedPayload.data.phoneNumber,
        gender: validatedPayload.data.gender,
        status: validatedPayload.data.status,
        profilePhoto: validatedPayload.data.profilePhoto,
        nationality: validatedPayload.data.nationality,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/employees", {
      body: newFormData,
    });

    const result = await response.json();
    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
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
      name: formData.get("name") as string,
      idNumber: formData.get("idNumber") as string,
      group: formData.get("group") as string,
      jobTitle: formData.get("jobTitle") as string,
      educationQualification: formData.get("educationQualification") as string,
      joiningDate: new Date(
        formData.get("joiningDate") as string
      ).toISOString(),
      email: formData.get("email") as string,
      status: formData.get("status") as string,
      profilePhoto: formData.get("profilePhoto") as string | undefined,
      nationality: formData.get("nationality") as string | undefined,
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
