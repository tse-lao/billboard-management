import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLighthouseKeys } from "@/lib/lighthouse";
import { truncateMiddle } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function ProfileInteractions({billboardAddress, timestamp}: {billboardAddress: any, timestamp:any}) {
  const { address } = useAccount();
    const [interactions, setInteractions] = useState<[]>([]);
  //get user
  //get jwt
  // call the bacekdn.

  useEffect(() => {
    const getAdInteractions = async () => {
      const { JWT, apiKey } = await getLighthouseKeys(address);
      if(!JWT){  return;}

    
      console.log(JWT);

      const url = `https://api.dataponte.com/interaction/billboard/${address}/${billboardAddress}/${timestamp}`

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: JWT,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setInteractions(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    if (address) {
      getAdInteractions();
    }
  }, [address, billboardAddress, timestamp]);

  return (
    <div className="space-y-8">
      {interactions?.length > 0 ? (
        interactions.map((interact: any, index: number) => (
          <div className="flex items-center" key={index}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Shared by</p>
              <p className="text-sm text-muted-foreground">
                {truncateMiddle(interact.user, 24)}
              </p>
            </div>
            <div className="ml-auto font-medium">
                {interact.hash}
            </div>
          </div>
        ))
      ) : (
        <div>No profile interactions with the billboards so far...</div>
      )}
    </div>
  );
}
