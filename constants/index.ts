import { Address } from "wagmi";
import billboard from "./abi/billboard.json";
import billboardSpace from "./abi/billboardSpace.json";
import { default as interactions, default as profile } from "./abi/profile.json";

const CONTRACTS = {
  mumbai: {
    billboard: "0xde7CE46b24936dfE294bBE4c6E3596Bc8Ee9dA81" as Address, 
    billboardSpace: "",
    profile: "0xeEc3516A2B806a79666a7903861eD5975c1738E0" as Address,
    interactions: "0xf1b80F765DcbaD95748E989D46AC23a1afB92105" as Address
  }
};

const ABI = {
  mumbai: {
    billboard: billboard, 
    billboardSpace: billboardSpace,
    profile: profile,
    interactions: interactions,
  },
};
export { ABI, CONTRACTS };
