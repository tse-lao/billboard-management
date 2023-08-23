import { PersonIcon, SizeIcon } from '@radix-ui/react-icons';
import { Map, TimerIcon } from 'lucide-react';
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
        <div className="p-6 bg-gray-300 rounded-lg shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            
            <div className="flex items-center space-x-2">
                <Map /> {/* Assuming you have Material Icons */}
                <p className="text-gray-700">{location}</p>
            </div>
            
            <div className="flex items-center space-x-2">
                <SizeIcon />
                <p className="text-gray-700">{size}</p>
            </div>
            <div className="flex items-center space-x-2">
                <SizeIcon />
                <p className="text-gray-700">{totalSupply}</p>
            </div>
            
            
            <p className="text-gray-600">{description}</p>
            
            <div className="flex items-center space-x-2">
                <PersonIcon />
                <p className="text-gray-700">{owner}</p>
            </div>
            
            <div className="flex items-center space-x-2">
                <TimerIcon />
                <p className="text-gray-700">{readableDate}</p>
            </div>
        </div>
    );
}

export default BillboardDetail;
