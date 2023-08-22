import React from "react";

interface BiddingItemProps {
  bid: number;
  startTime: number;
  status: number;
}

const BiddingItem: React.FC<BiddingItemProps> = ({
  bid,
  status,
  startTime,
}) => {
  const readableDate = new Date(startTime * 1000).toLocaleString();

  return (
    <div className="p-6 bg-gray-200 grid grid-cols-2 rounded-lg items-center justify-center w-full">
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-800">Current bid</h1>
        <span className="font-medium">{bid} ETH</span>
      </div>
      <div className="col-span-1">
        <h1 className="text-small font-light text-gray-600">Remaining Time</h1>
        <span className='font-medium'>22h: 14m: 12s</span>
      </div>
    </div>
  );
};

export default BiddingItem;
