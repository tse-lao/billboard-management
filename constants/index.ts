import { Address } from "wagmi";
import billboard from "./abi/billboard.json";
import billboardSpace from "./abi/billboardSpace.json";
import profile from "./abi/profile.json";

const CONTRACTS = {
  mumbai: {
    billboard: "0x5FBdE8022fd606651dD6a13eAb6Cb592B13D601F" as Address, 
    billboardSpace: "",
    profile: "0xeEc3516A2B806a79666a7903861eD5975c1738E0" as Address,
  }
};

const ABI = {
  mumbai: {
    billboard: billboard, 
    billboardSpace: billboardSpace,
    profile: profile,
  },
};
export { ABI, CONTRACTS };
