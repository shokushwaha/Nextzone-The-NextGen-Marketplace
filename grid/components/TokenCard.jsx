import Image from 'next/image'
import React, { useEffect } from 'react'

const TokenCard = ({ name, symbol, price, issued, expiry, hash }) => {
    const goToEtherScan = (url) => {
        window.open(`https://mumbai.polygonscan.com/tx/${url}`, '_blank');
    }



    const dynamicColor = name === "Gold Token"
        ? 'text-yellow-500'
        : name === "Silver Token"
            ? 'text-slate-400'
            : name === "Bronze Token"
                ? 'text-yellow-800'
                : 'font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-600';

    const dynamicBG = name === "Gold Token"
        ? 'bg-yellow-500'
        : name === "Silver Token"
            ? 'bg-slate-400'
            : name === "Bronze Token"
                ? 'bg-yellow-800'
                : 'bg-gradient-to-r from-yellow-500 to-pink-600';

    return (
        <>

            <div className='flex flex-col shadow-xl p-2  rounded-md m-4 items-center bg-slate-100 w-5/6 hover:scale-105 transition delay-150 duration-300 ease-in-out '>
                <div className=' w-36 rounded-md   '>
                    <img src={
                        price * 10 > 0 && price * 10 < 1000
                            ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836232/bronze_b9ryxr.jpg'
                            : price * 10 >= 1000 && price * 10 < 10000
                                ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836199/silver_klhlqq.jpg'
                                : price * 10 >= 10000 && price * 10 < 25000
                                    ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836123/gold_gyd341.jpg'
                                    : 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836170/premium_ibxcpn.jpg'


                    }
                        className='rounded-md mb-2'
                    />
                </div>
                <div className='flex items-center justify-center flex-col'>
                    <span className='flex items-center gap-2'>
                        <span className={`${dynamicColor} font-extrabold uppercase mb-2 text-lg`}>
                            {name}
                        </span>
                    </span>


                    <span className='flex items-center gap-2'>
                        <span className='text-gray-500 font-bold'>
                            Value:
                        </span>
                        <span className=' px-2 rounded-lg'>
                            {price}
                        </span>
                    </span>
                    <span className='flex items-center '>
                        <span className='text-gray-500 font-bold'>
                            Issued :
                        </span>
                        <span className=''>
                            {issued.substr(0, 10).split('-').reverse().join('-')}
                        </span>
                    </span>
                    <span className='flex items-center '>
                        <span className='text-gray-500 font-bold'>
                            Expires:
                        </span>
                        <span className=''>
                            {expiry.substr(0, 10).split('-').reverse().join('-')}
                        </span>
                    </span>

                    <button onClick={() => goToEtherScan(hash)} className={`${dynamicBG} text-gray-200 px-2 mt-2 rounded-md shadow-xl mb-2 p-1`}>View Reciept</button>
                </div>

            </div>


        </>
    )
}

export default TokenCard