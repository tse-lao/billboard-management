"use client"
import Loading from '@/components/core/loading/loading-icon';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdDetail from './[timestamp]/ad-details';
import Calendar from "./calendar";


interface BillboardData {
  address: string;
  timestamp: number;
  name: string;
  description: string;
  contract: string;
  size: string;
  ownerName: string;
  owner: string;
  location: {
    lat: number, 
    long:number,
  };
  startTime: number;
  content: string;
  totalSupply: number;
}

export default function BillBoardSpace() {
    const params = useParams()
    const [billboardData, setBillboardData] = useState<BillboardData>();
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const getBillboardData = async () => {
          setLoading(true)
            const url = process.env.API_URL || "http://localhost:4000"
            const response = await fetch(`${url}/billboard/details/${params.address.toString()}`);
            const data = await response.json();
            console.log(data);
            setBillboardData(data);
            setLoading(false)
        };
        getBillboardData();
    }, [params.address]);
    
    //we want to fetch the data now 
    
    if(loading) return <Loading />;
  return (
    <main>
      <div className="p-12">
            <div className="grid grid-cols-2">
              {billboardData &&            
                <AdDetail {...billboardData} adOwner={billboardData.owner} />
              }
              
              <div>
                
              </div>
            </div>
            <div className="col-span-3">
                {billboardData && billboardData.totalSupply > 0 &&
                  <Calendar address={params.address.toString()} startTime={billboardData?.startTime} maxDays={billboardData?.totalSupply}/>    
                }
            </div>
      </div>
    </main>
  );
}
