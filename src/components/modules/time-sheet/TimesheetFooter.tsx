import { useState } from "react";
export const TimesheetFooter = () => {
  const [signatures, setSignatures] = useState({
    notedBy: {
      name: "Mahabub_Alam",
      title: "Data Process",
      contact: "0567065181",
      signed: false,
    },
    checkedBy: {
      name: "BAKIR RIFAEY MOUSA",
      title: "Supervisor",
      contact: "0551178726",
      signed: false,
    },
    reCheckedBy: {
      name: "Reda_Abdelmaged",
      title: "Chief/Engineer",
      contact: "0592993070",
      signed: false,
    },
    approvedBy: {
      name: "Eng.Shoeib_Abou Zeid",
      title: "Operation Manager",
      contact: "",
      signed: false,
    },
  });
  const handleSignature = (key: keyof typeof signatures) => {
    setSignatures((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        signed: !prev[key].signed,
      },
    }));
  };
  return (
    <div className="p-6 border-t">
      <div className="grid grid-cols-4 gap-8">
        {Object.entries(signatures).map(([key, value]) => {
          const typedKey = key as keyof typeof signatures;
          const title = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .replace("By", "by:");
          return (
            <div key={key} className="text-center border p-4 rounded">
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <div className="mb-2">{value.title}</div>
              <div
                className={`h-12 mb-2 flex items-center justify-center ${
                  value.signed ? "text-blue-600 italic font-signature" : ""
                }`}
              >
                {value.signed ? value.name : ""}
              </div>
              <div className="text-sm text-gray-600 mb-4">{value.contact}</div>
              <button
                className={`px-4 py-2 rounded ${
                  value.signed ? "bg-green-500" : "bg-blue-500"
                } text-white`}
                onClick={() => handleSignature(typedKey)}
              >
                {value.signed ? "Signed" : "Sign"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
