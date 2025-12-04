export interface IEmployee {
  id: string;
  name: string;
  idNumber: string;
  jobTitle: string;
  educationQualification: string;
  profilePhoto?: string | null;
  group: string;
  joiningDate: string;
  email: string;
  phoneNumber: string;
  isDeleted: boolean;
  gender: string;
  nationality: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;

  employeeIds?: [];
  employeeFiles?: [];
}

export interface IEmployeeId {
  employeesId?: IEmployeeId[];
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
