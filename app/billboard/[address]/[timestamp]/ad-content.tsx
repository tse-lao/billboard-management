"use client"
import MediaUploader from "@/components/core/media-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ABI } from "@/constants";
import { uploadContent } from "@/lib/file-storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Address, useContractWrite } from "wagmi";



export default function AdContent({display, isOwner, size, contract, timestamp}: any) {
    const [mediaSource, setMediaSource] = useState<any>();
    const [loading, setLoading] = useState(false);
    const {write, isLoading, isSuccess}= useContractWrite({
        address: contract as Address,
        abi: ABI.mumbai.billboardSpace,
        functionName: "setPendingAdContent", 
      })
    const handleFileSelected = (file: File) => {
        console.log(file);
        setMediaSource(file);
        // You can now use this file for uploading or any other purpose
    };
    
    const width = size.split("x")[0] || 300;
    const height = (size.split("x")[1] || 100).trim();
    
    
    const changeContent = async() => {
        setLoading(true)
        // upload to ipfs
        const file = await uploadContent(mediaSource);
        console.log(file);
        
        if(file){
            //make sure that we upload the file to the blockchain
            write({args: [timestamp, file]}); 
        }
        // get url
        // set url to display
    }

    useEffect(() => {
        if(isSuccess){
            setLoading(false);
        }
    }, [isSuccess])
  return (
    <main>
         {isOwner ? (
          <Dialog>
          <DialogTrigger asChild>
          <Image
            src={display}
            alt="rubbish"
            width={height}
            height={width}
            className="rounded-lg hover:opacity-50 cursor-pointer border-2 hover:border-green-300"

          />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Content</DialogTitle>
              <DialogDescription>
                Make your changes to the width {width} and the height {height} of the content.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <MediaUploader onFileSelected={handleFileSelected} width={width} height={height} />
            </div>
            <DialogFooter>
            <Button type="submit" disabled={!mediaSource || loading}
                onClick={changeContent}  
              >{loading ? "Uploading content to chain" : "Upload Image"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
          
        ) : (
          <Image
            src={display}
            alt="adContent image"
            width={300}
            height={500}
            className="rounded-lg"
          />
        )}
    </main>
  )
}
