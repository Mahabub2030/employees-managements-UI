"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  status: "ACTIVE" | "INACTIVE" | "VACATION" | string;
}

export function StatusBadgeCell({ status }: StatusBadgeCellProps) {
  const getClass = () => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500 text-white";
      case "INACTIVE":
        return "bg-red-500 text-white";
      case "ON_LEAVE":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <Badge className={getClass()}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Badge>
  );
}
