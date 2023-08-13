import { useRouter } from 'next/router';
import React from 'react'
import Swal from 'sweetalert2';


const TermsAndConditions = () => {
    const router = useRouter();
    const redirectToTC = () => {
        router.push('/termsandconditions')
    }
    return (
        <>

            <div className='absolute right-2 top-[18vh] bg-white px-4 py-1 rounded-md shadow-xl'>
                <div className='flex items-center gap-2'>
                    <button onClick={redirectToTC} className='flex items-center gap-2'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>

                        </span>
                        <span className='text-black'>
                            Terms and Conditions
                        </span>
                    </button >
                </div>
            </div>
        </>
    )
}

export default TermsAndConditions