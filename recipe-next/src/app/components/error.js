'use client'

import { useRouter } from 'next/navigation'

export default function error({error, reset}){
    const router = useRouter()
    return(
         <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center text-4xl mb-3">Something went wrong!</h2>
      <p>{error?.message}</p>
      <div className="flex items-center justify-center">
      <button
        className="mt-8 rounded-md bg-green-700 px-4 py-2 text-sm text-white transition-colors hover:bg-yellow-700 mx-3"
        onClick={ 
          () => reset()
        }
      >
        Try again
      </button>  
      </div>
    </main>
    )

}