import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { roundAmount, truncateMiddle } from "@/lib/utils";
import { formatEther } from 'viem';

export function RecentBids({ bids }: { bids: any[] }) {
  return (
    <div className="space-y-8">
      {bids?.length > 0 ? (
        bids.map((bid: any, index: number) => (
          <div className="flex items-center" key={index}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Bid made by</p>
              <p className="text-sm text-muted-foreground">
                {truncateMiddle(bid.bidder, 24)}
              </p>
            </div>
            <div className="ml-auto font-medium">{roundAmount(parseInt(formatEther(bid.bidAmount)))}</div>
          </div>
        ))
      ) : (
        <div>No bids or transfers so far.</div>
      )}

    </div>
  );
}
