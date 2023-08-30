import { truncateMiddle } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BillboardItemProps {
  data: any;
}

const BillboardItem: FC<BillboardItemProps> = ({ data }) => {
    
    if(data.adContent === "") {
        data.adContent = "https://ipfs.io/ipfs/bafkreihvqgz6vt5pqajpdi4pdguhfu4pf7owpy65c6kdfvck2pfbgi7vqm"
    }else {
      data.adContent = "https://ipfs.io/ipfs/" + data.adContent ;
    }
  return (  
    <main className="bg-gray-50 flex flex-col rounded-md items-center justify-center shadow border hover:border-green-300">
        <div className="w-full flex relative aspect-video rounded-md p-1 bg-cf-200">
            <Image 
                src={data.adContent}
                alt="Billboard Image"
                fill={true}
                className="rounded-md object-scale-down m-1"
            />
        </div>
        <div className="flex justify-center items-center gap-1 flex-col my-5">
        <Link
        href={`/billboard/0x6ef66aa692259c681adb7c728a0cd44cadc81b42`}
        className="text-indigo-600 hover:text-green-600"
      >
         {data.name}
      </Link>
      <div>
        <span className="text-sm text-gray-700">{truncateMiddle(data.owner, 17)}</span>
      </div>
      <span className="text-gray-400 text-sm font-light">
        {data.size}  || {data.location}
      </span>
        </div>
      
    </main>
  );
};

export default BillboardItem;
