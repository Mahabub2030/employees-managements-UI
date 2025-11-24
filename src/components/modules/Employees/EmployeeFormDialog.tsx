import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EmployeeFormDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Employee</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <Input placeholder="Type employee name..." />
            <Input placeholder="Type employee id..." />
            <Input placeholder="Type employee id..." />
            <Input placeholder="Type employee id..." />
            <Input placeholder="Type employee id..." />
            <Input placeholder="Type employee id..." />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
