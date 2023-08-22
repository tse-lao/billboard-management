



export default function ProfileBalance({ loading, balance, token }: { loading: boolean, balance: string, token: string }) {
  return (
    <div className="flex flex-row items-center gap-4 hover:bg-gray-50 p-4 rounded-md ">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 capitalize">{token} balance</span>
        <span className={`text-gray-800 font-bold `}>{loading ? "loading" : balance}</span>
      </div>
    </div>

  )
}