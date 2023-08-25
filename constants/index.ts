import { Address } from "wagmi";
import billboard from "./abi/billboard.json";
import billboardSpace from "./abi/billboardSpace.json";
import profile from "./abi/profile.json";

const CONTRACTS = {
  mumbai: {
    billboard: "0xde7CE46b24936dfE294bBE4c6E3596Bc8Ee9dA81" as Address, 
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
