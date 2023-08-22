"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ABI, CONTRACTS } from "@/constants";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";

export default function CreateBillboard() {
  const [formData, setFormData] = useState({
    initialPrice: "10",
    baseURI: "https://api.dataponte.com",
    location: "52.370216,4.895168",
    size: "400x400",
    name: "Amsterdam Billboard",
    description: "",
    currentTimestamp: 0,
  });
  const { write, isLoading, isSuccess } = useContractWrite({
    address: CONTRACTS.mumbai.billboard,
    abi: ABI.mumbai.billboard,
    functionName: "createBillboardPendingApproval",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    function getNextDayTimestamp(): number {
      const now = new Date(); // Current date and time
      now.setDate(now.getDate() + 1); // Increment the day by 1
      now.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
      return now.getTime(); // Return the timestamp in milliseconds
  }
  
  // Usage
  const timestamp = getNextDayTimestamp() / 1000;
    
    
    setFormData((prev) => ({
      ...prev,
      currentTimestamp: timestamp,
    }));
  }, []);
  

  return (
    <main>
      CreateBillboard
      <div className="flex flex-col gap-4 p-24 bg-gray-600 rounded-md m-24">
        <Input
          type="text"
          placeholder="Initial Price"
          onChange={handleChange}
          name="initialPrice"
          value={formData.initialPrice}
        />
        <Input
          type="text"
          placeholder="Base URI"
          onChange={handleChange}
          name="baseURI"
          value={formData.baseURI}
        />
        <Input
          type="text"
          placeholder="Size"
          onChange={handleChange}
          name="size"
          value={formData.size}
        />
        <Input
          type="text"
          placeholder="Location"
          onChange={handleChange}
          name="location"
          value={formData.location}
        />
        <Input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
          value={formData.name}
        />
        <span>
          Current Timestamp: {formData.currentTimestamp}
        </span>

        <Button
          variant="secondary"
          disabled={isLoading || isSuccess}
          onClick={() => {
            write({
              args: [
                BigInt(formData.initialPrice), 
                formData.baseURI,
                formData.location,
                formData.size,
                formData.name,
                formData.currentTimestamp,
              ],
            });
          }}
        >
          {isLoading ? <span className="flex gap-4"><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Creating...</span> : isSuccess ? "Created" : "Create Billboard"}
        </Button>
      </div>
    </main>
  );
}
