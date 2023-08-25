"use client"
import { Button } from "@/components/ui/button";
import { ABI } from "@/constants";
import { truncateMiddle } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { formatEther } from 'viem';
import { Address, useAccount, useContractWrite } from "wagmi";



interface BiddingItemProps {
  auction: any;
  owner: string;
  contract: string;
  timestamp: string;
}

const BiddingItem: React.FC<BiddingItemProps> = ({
  auction,
  owner,
  contract, 
  timestamp
}) => {
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);
  const {address} = useAccount();
  const {write, isLoading, isSuccess}= useContractWrite({
    address: contract as Address,
    abi: ABI.mumbai.billboardSpace,
    functionName: "endAuction", 
    args: [timestamp]
  })

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = Date.now();
      const timeDiff = (auction.endTime * 1000) - now;


      if (timeDiff <= 0) {
        setRemainingTime("00h: 00m: 00s");
        setFinished(true);
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setRemainingTime(
        `${String(hours).padStart(2, "0")}h: ${String(minutes).padStart(
          2,
          "0"
        )}m: ${String(seconds).padStart(2, "0")}s`
      );
    };

    const interval = setInterval(updateRemainingTime, 1000);

    // Initial update
    updateRemainingTime();

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, [auction.endTime]);
  
  const finishAuction = async () => {
    console.log("finish auction");
  };
  

  if (finished) {
    return ( 
      <div className="grid grid-cols-2 gap-4 items-center justify-center w-full">
      <div className="col-span-1 bg-gray-200 p-6 rounded-lg">
        <h1 className="text-small font-light text-gray-800">{truncateMiddle(auction.higestBidder, 15)}</h1>
        <span className="font-medium">{formatEther(auction.highestBid)} MATIC</span>
      </div>
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-600">Billboard Owner</h1>
        <span className='font-medium'>
          {
             address == owner ? <Button onClick={() => write()} disabled={isLoading}>{isLoading? "finishing...": isSuccess ? "Auction ended!": "End Auction"}</Button> : "Waiting for owner"
          }
        </span>
      </div>
    </div>
    )
  }
  return (
    <div className="p-6 bg-gray-200 grid grid-cols-2 rounded-lg items-center justify-center w-full">
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-800">Current bid</h1>
        <span className="font-medium">{formatEther(auction.highestBid)} MATIC</span>
      </div>
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-600">Remaining Time</h1>
        <span className='font-medium'>{remainingTime}</span>
      </div>
    </div>
  );
};

export default BiddingItem;
