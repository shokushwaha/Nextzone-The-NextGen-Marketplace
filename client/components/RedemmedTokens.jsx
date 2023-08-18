import React from 'react'

const RedemmedTokens = ({ name, symbol, price, usedOn }) => {
    return (
        <>
            <div className='flex flex-col shadow-xl p-2  rounded-md m-4 items-center bg-slate-100 hover:scale-105 transition delay-150 duration-300 ease-in-out  w-[10vw] z-[-1] opacity-50 '>
                <div className=' w-32 rounded-md   '>
                    <img src={
                        price * 100 > 0 && price * 100 < 1000
                            ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836232/bronze_b9ryxr.jpg'
                            : price * 100 >= 1000 && price * 100 < 10000
                                ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836199/silver_klhlqq.jpg'
                                : price * 100 >= 10000 && price * 100 < 25000
                                    ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836123/gold_gyd341.jpg'
                                    : 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836170/premium_ibxcpn.jpg'


                    }
                        className='rounded-md mb-2'
                    />
                </div>
                <div className='flex items-center justify-center flex-col'>
                    <span className='flex items-center gap-2'>
                        <span className='font-extrabold uppercase mb-2 text-lg'>
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
                    <span className='flex flex-col items-center '>
                        <span className='text-gray-500 font-bold'>
                            Redemmed On:
                        </span>
                        <span className=''>
                            {usedOn.substr(0, 10).split('-').reverse().join('-')}
                        </span>
                    </span>

                    {/* <button onClick={() => goToEtherScan(hash)} >View Reciept</button> */}
                </div>

            </div>

        </>
    )
}

export default RedemmedTokens