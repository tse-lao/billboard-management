import { formatBytes, formatDate } from "@/lib/helpers";
import { useAccount } from "wagmi";


export default function FileDetailInformation({detail}: {detail: any}) {
  const {address} = useAccount();

  /* publicKey: '0xa3c960b3ba29367ecbcaf1430452c6cd7516f588',
  fileName: 'flow1.png',
  mimeType: 'image/png',
  txHash: '0x7c9ee1585be6b85bef471a27535fb4b8d7551340152c36c025743c36fd0d1acc',
  status: 'testnet',
  createdAt: 1662880331683,
  fileSizeInBytes: '31735',
  cid: 'QmZvWp5Xdyi7z5QqGdXZP63QCBNoNvjupF1BohDULQcicA',
  id: 'aaab8053-0f1e-4482-9f84-d413fad14266',
  lastUpdate: 1662883207149,
  encryption: true */
    
    
  return (

    <dl className="mt-2 divide-y divide-gray-500">
    <div className="flex justify-between py-3 text-sm font-medium">
    <dt className="text-gray-300">Size</dt>
    <dd className="text-green-300 font-light">{formatBytes(detail.fileSizeInBytes)}</dd>

  </div>
    <div className="flex justify-between py-3 text-sm font-medium">
      <dt className="text-gray-300">Type</dt>
      <dd className="text-green-300 font-light">{detail.mimeType}</dd>
    </div>
    {detail.lastUpdate && (
    <div className="flex justify-between py-3 text-sm font-medium">
      <dt className="text-gray-300">PublicKey</dt>
      <dd className="text-green-300 font-light">{detail.publicKey}</dd>
    </div>
    )}
    {detail.lastUpdate && (
    <div className="flex justify-between py-3 text-sm font-medium">
      <dt className="text-gray-300">Created</dt>
      <dd className="text-gray-300">{formatDate(detail.createdAt, "yyyy-MM-dd HH:mm:ss")}</dd>
    </div>
    )}
    {detail.lastUpdate && (
      <div className="flex justify-between py-3 text-sm font-medium">
      <dt className="text-gray-300">Updated at</dt>
      <dd className="text-gray-300">{formatDate(detail.lastUpdate, "yyyy-MM-dd HH:mm:ss")}</dd>
    </div>
    )}

    <div className="flex justify-between py-3 text-sm font-medium">
      <dt className="text-gray-300">Encryption</dt>
      {detail.encryption ? <dd className="text-green-300">Yes</dd> : <dd className="text-red-400">No</dd>}
    </div>
  </dl>
  )
}