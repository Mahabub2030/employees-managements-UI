export interface IEmployee {
  S_NO?: string;
  id: string;
  name: string;
  idNumber: string;
  jobTitle: string;
  employeeId: string;
  educationQualification?: string;
  profilePhoto?: string;
  group: string;
  joiningDate: string;
  email: string;
  phoneNumber: string;
  nationality?: string;
  gender: "MALE" | "FEMALE";
  status: string;
  isDeleted: boolean;
  createdAt?: string; // Prisma auto-generates
  updatedAt?: string; // Prisma auto-generates
}
export interface IEmployeeId {
  employeesId?: IEmployeeId[];
  S_NO: string;
  name: string;
  email: string;
  profilePhoto: string;
  employeeId: string;
  IqamaNumber: string;
  IqamaExpireDate: string;
  TotalDaysRemaing: string;
  IdNumber: string;
  IdExpiriDate: string;
  department: string;
  position: string;
  isDeleted: boolean;
  createdAt: string;
  id: string;
  title: string;
  icon: string;
}
