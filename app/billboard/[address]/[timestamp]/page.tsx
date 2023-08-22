"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import AdDetail from "./ad-details";
import BiddingItem from "./bidding-item";
import { RecentBids } from "./recent-bids";

Image;
export default function AdSpace() {
  const params = useParams();

  const adData = {
    address: "Downtown",
    timestamp: 10000,
    name: "Main Street Billboard",
    description: "Visible from the main road.",
    contract: "0xbe4e412ff7d16107f2e6ddf8e190627fa7b6bdc9",
    size: "10x10",
    ownerName: "John Doe",
    owner: "0xbe4e412ff7d16107f2e6ddf8e190627fa7b6bdc9",
    startTime: 1678645200, // Example Unix timestamp
    content: `https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80`,
  };
  return (
    <main className="grid grid-cols-4 gap-8">
      <div className="col-span-2 flex flex-col justify-center items-center gap-8 px-12">
        <Image
          src={adData.content}
          alt={adData.name}
          width={300}
          height={500}
          className="rounded-lg"
        />

        <BiddingItem bid={1.1} status={1} startTime={adData.startTime} />
        <div className="flex justify-between gap-4 w-full">
          <Button className="w-1/2 py-6 ">Place a bid</Button>
          <Button variant={"secondary"} className="w-1/2 py-6 ">
            Buy Now
          </Button>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4 p-8 justify-center">
        <AdDetail {...adData} />
        <div className="">
          <Card className="col-span-3 bg-gray-100 ">
            <CardHeader>
              <CardTitle>Latest Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentBids />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
