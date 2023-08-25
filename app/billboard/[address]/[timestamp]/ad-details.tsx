import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatDateFromTimestamp } from "@/lib/utils";
import { MapIcon, Scaling, TimerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AdDetailProps {
  name: string;
  contract: string;
  timestamp: number;
  description: string;
  owner: string;
  adOwner: string;
  location: string;
  size: string;
}

const AdDetail: React.FC<AdDetailProps> = ({
  name,
  contract,
  timestamp,
  adOwner,
  location,
  size,
}) => {
  return (
    <main className="flex flex-col gap-8 w-full my-12 justify-start items-start">
      <div>
        <h1 className="text-3xl tracking-wider font-bold">{name}</h1>
        <Link
          href={`https://mumbai.polygonscan.com/token/${contract}`}
          target="_blank"
        >
          <span className="text-gray-600 text-sm ml-4">{contract}</span>
        </Link>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>NU</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium text-muted-foreground leading-none">
            Owned By
          </p>
          <p className="text-sm ">{adOwner}</p>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-4">
        <Card className="flex justify-center items-center">
          <div className="flex flex-col gap-3 items-center justify-center place-content-center m-4 ">
            <MapIcon className="text-green-800" />
            <p className="text-gray-600 text-sm text-wrap overflow-auto">{location}</p>
          </div>
        </Card>
        <Card className="flex justify-center items-center">
          <div className="flex flex-col gap-3 items-center justify-center m-4">
            <TimerIcon className="text-green-800" />
            <p className="text-gray-600 text-sm">
              {formatDateFromTimestamp(timestamp)}
            </p>
          </div>
        </Card>
        <Card className="flex justify-center items-center content-center ">
          <div className="flex flex-col gap-3 justify-center items-center m-4">
            <Scaling className="text-green-800" />
            <p className="text-gray-600 text-sm">{size}</p>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default AdDetail;
