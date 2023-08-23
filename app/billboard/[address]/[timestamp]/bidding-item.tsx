"use client"
import React, { useEffect, useState } from "react";
import { formatEther } from 'viem';
interface BiddingItemProps {
  bid: bigint;
  endTime: number;
  status: number;
}

const BiddingItem: React.FC<BiddingItemProps> = ({
  bid,
  status,
  endTime,
}) => {
  const [remainingTime, setRemainingTime] = useState<string>("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = Date.now();
      const timeDiff = (endTime * 1000) - now;


      if (timeDiff <= 0) {
        setRemainingTime("00h: 00m: 00s");
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
  }, [endTime]);
  

  return (
    <div className="p-6 bg-gray-200 grid grid-cols-2 rounded-lg items-center justify-center w-full">
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-800">Current bid</h1>
        <span className="font-medium">{formatEther(bid)} MATIC</span>
      </div>
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-600">Remaining Time</h1>
        <span className='font-medium'>{remainingTime}</span>
      </div>
    </div>
  );
};

export default BiddingItem;
