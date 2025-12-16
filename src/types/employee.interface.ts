export interface IEmployee {
  name: string;
  idNumber: string;
  jobTitle: string;
  educationQualification: string;
  profilePhoto: string;
  group: string;
  joiningDate: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  status: string;
  nationality: string;
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
