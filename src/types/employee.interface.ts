export interface IEmployee {
  S_NO?: number;
  joiningDate: string;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  gender: string;

  jobTitle: string;
  group: string;
  title: string; // Title/position
  employeeId: number; // Internal Employee ID
  idNumber: string; // National ID / Iqama number
  educationQualification?: string;
  status: "ACTIVE" | "INACTIVE" | "VACATION";

  salary: string;
  profilePhoto: string;
  icon: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeId {
  data: IEmployeeId[];
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
