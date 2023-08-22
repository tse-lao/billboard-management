

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { Address, createPublicClient, formatEther, http } from 'viem';
import { filecoinCalibration, polygonMumbai } from "wagmi/chains";

import ModalLayout from '../core/modalLayout';
import ProfileBalance from './profileBalance';



export default function ProfileDetails({ showModal, open, setShowModal }: any) {

    const { disconnect } = useDisconnect();
    const [maticBalance, setMaticBalance] = useState("");
    const [fileBalance, setFileBalance] = useState("0");
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const { chain } = useNetwork();



    const { address: account, isConnected } =
        useAccount();


    useEffect(() => {
        async function getBalances() {
            const client = createPublicClient({
                chain: polygonMumbai,
                transport: http('https://rpc-mumbai.maticvigil.com')
            });
            const filecoinClient = createPublicClient({
                chain: filecoinCalibration,
                transport: http('https://filecoin-calibration.chainup.net/rpc/v1')
            });
        
            const getMaticBalance: bigint = await client.getBalance({
                address:account as Address
            })
        
            const formatBalance: string = formatEther(getMaticBalance);
            setMaticBalance(formatBalance);
        
            const filecoinBalance = await filecoinClient.getBalance({
                address: account as Address
            })
        
            const formatBalanceFilecoin: string = formatEther(filecoinBalance);
            setFileBalance(formatBalanceFilecoin);
        
        
        }

            
        getBalances();
        
        setLoading(false)

}, [account]);




    



async function copyAddress() {
    navigator.clipboard.writeText(account as Address)
    toast.success("Copied to clipboard")
}

return (
    <ModalLayout title="" showModal={showModal}>
        {isConnected ? (

            <div className='flex flex-col divide-y divide-solid'>
                <div id="username" className='py-4'>
                    <span>{name}</span>
                    <div className='text-xs text-center py-1 rounded hover:bg-gray-300 cursor-context-menu'
                        onClick={() => copyAddress()}
                    >
                        {account}
                    </div>

                </div>
                <div id="balances" className='grid grid-cols-2 py-4'>

                    <ProfileBalance loading={loading} token="filecoin" balance={fileBalance} />
                    <ProfileBalance loading={loading} token="matic" balance={maticBalance} />

                </div>
                <div className="grid grid-cols-2 p-4 gap-2">
                    <Link
                        href="/profile/settings"
                        className=' font-bold  px-3 rounded-md py-4 text-center hover:bg-gray-400'
                    >
                        Setting
                    </Link>
                    <button
                        className='text-red-500 py-4 font-bold hover:bg-red-400   px-3 rounded-md'
                        onClick={() => { disconnect(); setShowModal(false) }}
                    >
                        Disconnect
                    </button>



                </div>
            </div>


        ) : (
            <p>Not connected</p>
        )}
    </ModalLayout>
)
}