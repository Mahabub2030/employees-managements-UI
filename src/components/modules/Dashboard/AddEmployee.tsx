"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function AddEmployeeComponents() {
  // State for the select fields
  const [joinMonth, setJoinMonth] = useState("");
  const [joinYear, setJoinYear] = useState("");

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data Submitted: ", {
      ...data,
      joinMonth,
      joinYear,
    });

    form.reset();
    setJoinMonth("");
    setJoinYear("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handelSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Add Employee</FieldLegend>
            <FieldDescription>Add new employee details below</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Employee Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Employee name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
                <Input
                  id="employeeId"
                  name="employeeId"
                  placeholder="12345"
                  required
                />
                <FieldDescription>
                  Enter your 5-digit employee number
                </FieldDescription>
              </Field>

              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="joinMonth">Joining Month</FieldLabel>
                  <Select
                    value={joinMonth}
                    onValueChange={setJoinMonth}
                    name="joinMonth"
                  >
                    <SelectTrigger id="joinMonth">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0");
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="joinYear">Joining Year</FieldLabel>
                  <Select
                    value={joinYear}
                    onValueChange={setJoinYear}
                    name="joinYear"
                  >
                    <SelectTrigger id="joinYear">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 6 }, (_, i) => {
                        const year = (2024 + i).toString();
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="month">Month</FieldLabel>
                  <Input id="month" name="month" placeholder="MM" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
