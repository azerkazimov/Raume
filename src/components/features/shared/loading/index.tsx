import { Loader2 } from "lucide-react";


export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
            <Loader2 className='size-6' />
        </div>
    </div>
  )
}
