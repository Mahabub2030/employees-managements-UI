"use client";
import { updateEmployees } from "@/components/services/admin/getEmployees";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEmployee } from "@/services/employeeManagement";
import { IEmployee } from "@/types/employee.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IEmployeeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  employee: IEmployee;
}

const EmployeeFormDialog = ({
  open,
  onClose,
  onSuccess,
  employee: employees,
}: IEmployeeFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!employees;

  const [gender, setGender] = useState<string>(employees?.gender ?? "MALE");
  const [employeeStatus, setEmployeeStatus] = useState<string>(
    (employees?.status as string) || "ACTIVE"
  );
  const joiningDate = employees?.joiningDate
    ? new Date(employees.joiningDate).toISOString()
    : null;

  const [employeeGroup, setEmployeeGroup] = useState<string>(
    employees?.group || ""
  );
  const [employeeNationality, setEmployeeNationality] = useState<string>(
    employees?.nationality || ""
  );
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setSelectedFile(file || null);
  // };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateEmployees.bind(null, employees.idNumber!) : createEmployee,
    null
  );

  const handleClose = () => {
    formRef.current?.reset();

    // Reset controlled Select states
    setGender(employees?.gender ?? "MALE"); // Reset to original employee or default
    setEmployeeStatus(employees?.status ?? "ACTIVE");
    setEmployeeGroup(employees?.group ?? "");
    setEmployeeNationality(employees?.nationality ?? "");

    formRef.current?.reset(); // Clear form
    onClose(); // Close dialog
  };

  console.log({ state, data: state?.formData });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                defaultValue={
                  state?.formData?.name || (isEdit ? employees?.name : "")
                }
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                defaultValue={
                  state?.formData?.email || (isEdit ? employees?.email : "")
                }
              />
              <InputFieldError state={state} field="email" />
            </Field>
            {/* Employee ID Number */}
            <Field>
              <FieldLabel htmlFor="idNumber">Employee ID Number</FieldLabel>
              <Input
                id="idNumber"
                name="idNumber"
                type="text"
                placeholder="Enter employee ID number"
                defaultValue={
                  state?.formData?.idNumber ||
                  (isEdit ? employees?.idNumber : "")
                }
              />
              <InputFieldError state={state} field="idNumber" />
            </Field>

            {/* Gender */}
            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input id="gender" name="gender" type="hidden" value={gender} />
              <Select
                value={gender}
                onValueChange={(value) => setGender(value as string)}
                defaultValue={
                  state?.formData?.gender || (isEdit ? employees?.gender : "")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="gender" />
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={
                  state?.formData?.phoneNumber ||
                  (isEdit ? employees?.phoneNumber : "")
                }
              />
              <InputFieldError state={state} field="phoneNumber" />
            </Field>

            {/* Status (optional, for edit only) */}

            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Input type="hidden" name="status" value={employeeStatus} />
              <Select value={employeeStatus} onValueChange={setEmployeeStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                  <SelectItem value="TRANSFER">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            {/* Profile Photo */}

            {/* Other optional fields */}
            <Field>
              <FieldLabel htmlFor="group">Group</FieldLabel>

              <Input type="hidden" name="group" value={employeeGroup} />

              <Select value={employeeGroup} onValueChange={setEmployeeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Landscaping">Landscaping</SelectItem>
                  <SelectItem value="Irrigation">Irrigation</SelectItem>
                  <SelectItem value="Street Light">Street Light</SelectItem>
                  <SelectItem value="Nursery">Nursery</SelectItem>
                  <SelectItem value="Royal Terminal">Royal Terminal</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="jobTitle">Job Title</FieldLabel>
              <Input
                id="jobTitle"
                name="jobTitle"
                defaultValue={
                  state?.formData?.jobTitle ||
                  (isEdit ? employees?.jobTitle : "")
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="educationQualification">
                Qualification
              </FieldLabel>
              <Input
                id="educationQualification"
                name="educationQualification"
                defaultValue={
                  state?.formData?.educationQualification ||
                  (isEdit ? employees?.educationQualification : "")
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="joiningDate">Joining Date</FieldLabel>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                defaultValue={joiningDate ? joiningDate.split("T")[0] : ""}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="nationality">Nationality</FieldLabel>
              <Input
                type="hidden"
                name="nationality"
                value={employeeNationality}
              />
              <Select
                value={employeeNationality}
                onValueChange={setEmployeeNationality}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saudi">Saudi</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                  <SelectItem value="Egypt">Egypt</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update Employee"
                : "Create Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFormDialog;
