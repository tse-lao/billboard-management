import React from 'react';

interface BillboardDetailProps {
    location: string;
    size: string;
    name: string;
    description: string;
    totalSupply: number;
    owner: string;
    startTime: number;
}

const BillboardDetail: React.FC<BillboardDetailProps> = ({
    location,
    size,
    name,
    totalSupply, 
    description,
    owner,
    startTime
}) => {
    const readableDate = new Date(startTime *1000).toLocaleString();

    return (
        <div className="grid grid-cols-2 p-6  rounded-lg  space-y-4">
            <div className="flex flex-col gap-1">
            </div>
            <div>
                
            </div>
            
        </div>
    );
}

export default BillboardDetail;
