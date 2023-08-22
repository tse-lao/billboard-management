
"use client"
import { Input } from "@/components/ui/input";
import { getLighthouseKeys } from "@/lib/services/lighthouse";
import lighthouse from "@lighthouse-web3/sdk";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function FileSharedWith({ cid }: { cid: string }) {

    const [publicShareKey, setPublicShareKey] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { address } = useAccount();
    const [refresh, setRefresh] = useState(false);

    const [accessControl, setAccessControl] = useState({
        conditions: [],
        conditionsSolana: [],
        sharedTo: [],
        owner: '0xae0c1e25dc9dbb782f67757a236e5335d7670407',
        cid: 'QmQ4RtiVh43E1QUKq2aNcSAzLv5WELxwdnncj3Mjp4PCUk'
    })


    useEffect(() => {
        const getAccessConditions = async () => {
            const response = await lighthouse.getAccessConditions(cid);
            setAccessControl(response.data);
        };

        getAccessConditions();
    }, [refresh, cid])


    const sharePrivateFile = async () => {
        // Then get auth message and sign
        // Note: the owner of the file should sign the message.
        if(!address) return;
        const {JWT, apiKey} = await getLighthouseKeys(address);

        //neeed to collect public key o a user. 
        const publicKeyUserB = [publicShareKey];

        if(!JWT) return;
        try {
            await lighthouse.shareFile(
                address,
                publicKeyUserB,
                cid,
                JWT
            );

            setRefresh(!refresh);
        } catch (e) {
            setErrorMessage("something happend while shaaring")
        }

    }


    const applyAccessConditions = async (e:any) => {

        const conditions = [
            {
                id: 1,
                chain: "Mumbai",
                method: "hasAccess",
                standardContractType: "Custom",
                contractAddress: "0x780077307BE090E24Eb2Ed0d70393711Cc986540",
                returnValueTest: {
                    comparator: "==",
                    value: "true"
                },
                parameters: [":userAddress", 1],
                inputArrayType: ["address", "uint256"],
                outputType: "bool"
            }
        ];



        // Aggregator is what kind of operation to apply to access conditions
        // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
        const aggregator = "([1])";
        
        if(!address) return;
        const {JWT} = await getLighthouseKeys(address);
        
        if(!address || !JWT) return;

        /*
          accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
            Parameters:
              publicKey: owners public key
              CID: CID of the file to decrypt
              signedMessage: message signed by the owner of publicKey
              conditions: should be in a format like above
              aggregator: aggregator to apply conditions
        */
        const response = await lighthouse.applyAccessCondition(
            address,
            cid,
            JWT,
            conditions,
            aggregator
        );

        console.log(response);
        /*
          {
            data: {
              cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
              status: "Success"
            }
          }
        */
    }


    return (

        <div className="flex flex-col gap-4">
            <div>
                <h3 className="text-gray-300">Shared with</h3>
                <ul role="list" className="mt-2 divide-y divide-gray-500 border-b border-t border-gray-500">
                    {accessControl.sharedTo.map((person) => (
                        <li className="flex items-center justify-between py-3" key={person}>
                            <div className="flex items-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="h-8 w-8 rounded-full"
                                />
                                <p className="ml-4 text-sm font-medium text-gray-900 truncate">{person} </p>
                            </div>
                            <button
                                type="button"
                                className="ml-6 rounded-md  text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Remove <span className="sr-only truncate">{person}</span>
                            </button>
                        </li>
                    ))}

                </ul>

                <div className="flex items-center justify-between py-2 gap-2">
                    <Input 
                        onChange={e => setPublicShareKey(e.target.value)}
                        className="border-1 bg-gray-400 outline-gray-400 rounded-md text-sm focus:border-green-500 text-gray-900
                         focus:outline-none focus:ring-1 focus:ring-green-200 focus:ring-opacity-50 px-3 py-2 w-full "
                    />
                    <button
                        type="button"
                        className="group -ml-1 bg-green-300 flex items-center rounded-md  hover:bg-green-500 p-1"
                        onClick={e => sharePrivateFile()}
                    >
                            <PlusIcon className="  text-white" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {accessControl.conditions.length > 0 && (
                <div>
                    <h3 className="font-medium text-gray-900">Access Control</h3>
                    <ul role="list" className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                        {false && accessControl.conditions.map((condition:any) => (
                            <li className="flex items-center justify-between py-3" key={condition.id}>
                                <div className="flex items-center">
                                    {condition?.chain} {condition?.method} {condition?.value}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={(e) => applyAccessConditions(e)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >Apply Access Conditions</button>
                </div>

            )}





        </div>

    )
}

