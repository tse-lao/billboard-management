import { Button } from "@/components/ui/button"
import { ABI, CONTRACTS } from "@/constants"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useContractWrite } from "wagmi"

export default function AdBalance() {
    
    const {write, isLoading} = useContractWrite({
        address: CONTRACTS.mumbai.interactions, 
        abi: ABI.mumbai.interactions, 
        functionName: "depositTokens"
    })
  return (
    <div>
      <Button 
        onClick={write()}
         disabled={isLoading}
        >
            {isLoading  ? <span className="flex gap-4"><ReloadIcon className="animate-spin mr-2" /> Deposiing</span>: "Deposit Tokens"}    
        </Button>
    </div>
  )
}
