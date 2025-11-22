import { serverFetch } from "@/lib/server-fetch";

export async function getEmployees() {
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
