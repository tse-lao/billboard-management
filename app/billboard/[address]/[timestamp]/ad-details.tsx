import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { SizeIcon } from "@radix-ui/react-icons";
import { MapIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AdDetailProps {
  name: string;
  contract: string;
  timestamp: number;
  description: string;
  owner: string;
  size: string;
}

const AdDetail: React.FC<AdDetailProps> = ({
    name,
    contract,
    timestamp,
    description,
    owner,
    size
}) => {

  return (
    <main className="flex flex-col gap-8 w-full my-12">
        <div>
            <h1 className="text-3xl tracking-wider font-bold">{name}</h1>
            <Link href={`https://mumbai.polygonscan.com/token/${contract}`} target="_blank"><span className="text-gray-600 text-sm ml-4">{contract}</span></Link>    
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>NU</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium text-muted-foreground leading-none">Owned By</p>
            <p className="text-sm ">
                {owner}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
            <Card>
                <CardContent className="flex flex-col gap-3 items-center justify-center place-content-center ">
                    <MapIcon />
                    <p className="text-gray-600">{size}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex flex-col gap-3 items-center justify-center">
                    <TimerIcon />
                    <p className="text-gray-600">{timestamp}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex flex-col gap-3 items-center justify-center center">
                    <SizeIcon />
                    <p className="text-gray-600">{size}</p>
                </CardContent>
            </Card>
        </div>
    </main>
  );
};

export default AdDetail;
