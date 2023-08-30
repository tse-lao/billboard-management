"use client";
import Loading from "@/components/core/loading/loading-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ABI } from "@/constants";
import { returnTimestamp } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { Address, useAccount, useContractWrite } from "wagmi";
import AdContent from "./ad-content";
import AdDetail from "./ad-details";
import BiddingItem from "./bidding-item";
import { ProfileInteractions } from "./profile-interactions";
import { RecentBids } from "./recent-bids";

export default function AdSpace() {
  const params = useParams();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("0");
  const [isOwner, setIsOwner] = useState(false);
  const [display, setDisplay] = useState("");
  const [auctionData, setAuctionData] = useState<any>({
    price: 0,
    time: 86400,
  });
  const [adData, setAdData] = useState<any>();
  
  const { write: acceptContent, isLoading: acceptingContent } =
    useContractWrite({
      address: params.address as Address,
      abi: ABI.mumbai.billboardSpace,
      functionName: "approveAdContent",
      args: [params.timestamp],
    });
  const { write, isLoading: startingAuction } = useContractWrite({
    address: params.address as Address,
    abi: ABI.mumbai.billboardSpace,
    functionName: "startAuction",
  });
  const { write: bid, isLoading: bidding } = useContractWrite({
    address: params.address as Address,
    abi: ABI.mumbai.billboardSpace,
    functionName: "placeBid",
  });

  useEffect(() => {
    const getBillboard = async () => {
      const url = process.env.API_URL || "http://localhost:4000";
      const response = await fetch(
        `${url}/billboard/details/${params.address}/${params.timestamp}`
      );
      const data = await response.json();

      if (data.adContent == "") {
        setAdData({
          ...data,
          display:
            "https://images.unsplash.com/photo-1528402671825-9a525ab8b5b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        });
        setDisplay(
          "https://images.unsplash.com/photo-1528402671825-9a525ab8b5b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        );
      } else {
        setAdData({
          ...data,
          display: `https://ipfs.io/ipfs/${data.adContent}`,
        });
        setDisplay(`https://ipfs.io/ipfs/${data.adContent}`);
      }

      console.log(data);

      if (data.owner == address) {
        setIsOwner(true);
        if (data.pendingContent != "") {
          setDisplay(`https://ipfs.io/ipfs/${data.pendingContent}`);
        }
      }
      setIsLoading(false);
    };

    if (address && params.address && params.timestamp && isLoading) {
      setIsLoading(true);
      getBillboard();
    }
    console.log(params, address);
  }, [params, address, isLoading]);

  const startAuction = async () => {
    console.log("start auction");
  };

  const handleSelectChange = (e: any, type: string) => {
    if (type == "time") {
      console.log(e);
      setAuctionData({
        ...auctionData,
        time: parseInt(e),
      });
      return;
    }
  };
  const handlePriceChange = (e: any) => {
    setAuctionData({
      ...auctionData,
      price: e.target.value,
    });
  };

  if (isLoading) return <Loading />;
  return (
    <main className="grid md:grid-cols-4 gap-8">
      <div className="col-span-2 flex flex-col justify-center items-center gap-8 px-8">
        <AdContent
          isOwner={isOwner}
          display={display}
          size={adData.size}
          contract={params.address.toString()}
          timestamp={params.timestamp.toString()}
        />

        {isOwner && adData.pendingContent && (
          <Button onClick={() => acceptContent()} disabled={acceptingContent}>
            {acceptingContent ? (
              <span className="flex gap-2">
                <ReloadIcon className="animate-spin" /> Accepting..
              </span>
            ) : (
              "Accept Pending"
            )}
          </Button>
        )}

        {adData.auction?.active ? (
          <BiddingItem
            auction={adData?.auction}
            owner={adData?.owner}
            contract={params.address.toString()}
            timestamp={params.timestamp.toString()}
          />
        ) : adData?.price > 0 ? (
          <Button variant={"secondary"} className="w-1/2 py-6 ">
            Buy Now
          </Button>
        ) : address === adData?.adOwner ? (
          <Dialog>
            <DialogTrigger className="px-4 py-2 bg-primary text-white rounded-md">
              Start Auction
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start Auction</DialogTitle>
                <DialogDescription>
                  Start your auction here, you can set the starting price and
                  the duration of the auction.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Start Price
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={auctionData.price}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Select
                    defaultValue={auctionData.time.toString()}
                    onValueChange={(e) => handleSelectChange(e, "time")}
                  >
                    <SelectTrigger className="w-[275px]">
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="86400">One Day</SelectItem>
                      <SelectItem value="259200">Three Daus</SelectItem>
                      <SelectItem value="604800">One Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  onClick={() =>
                    write({
                      args: [
                        params.timestamp,
                        auctionData.price,
                        auctionData.time,
                      ],
                    })
                  }
                  disabled={startingAuction}
                >
                  {startingAuction ? (
                    <span className="flex gap-4">
                      <ReloadIcon className="animate-spin mx-2 " /> Starting
                      auction..
                    </span>
                  ) : (
                    "Start Auction"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button>Already sold</Button>
        )}

        {adData.auction?.active &&
          adData.auction?.endTime > returnTimestamp() && (
            <div className="flex justify-between gap-4 w-full">
              <Input
                className="w-1/2 py-6 "
                placeholder="Enter your bid"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={adData.auction?.highestBid + 0.05}
              />
              <Button
                className="w-1/2 py-6 "
                onClick={() =>
                  bid({
                    args: [params.timestamp],
                    value: parseEther(bidAmount),
                  })
                }
                disabled={bidding}
              >
                {bidding ? (
                  <span>
                    <ReloadIcon className="animate-spin" /> Loading..{" "}
                  </span>
                ) : (
                  "Place Bid"
                )}
              </Button>
            </div>
          )}
      </div>
      <div className="col-span-2 flex flex-col gap-4 p-8 justify-center">
        <AdDetail
          {...adData}
          contract={params.address}
          timestamp={params.timestamp}
        />
        <div className="">
          <Card className="col-span-3 bg-gray-100 max-w-[500px]">
            <CardHeader>
              <CardTitle>Latest Bids</CardTitle>
            </CardHeader>
            <CardContent>
              {adData.adOwner ===  address  ? <ProfileInteractions billboardAddress={params.address} timestamp={params.timestamp} />: <RecentBids bids={adData.bids} />}
              
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
