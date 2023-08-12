import React from 'react'

const TokenModal = ({ ftName, ftSymbol, ftAmnt }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-4 '>

            <span className='text-lg'>Congratulations! You have won a
                <span className='font-extrabold px-2 '>
                    {ftName}
                </span>
            </span>
            <div className='mt-4 flex flex-col items-center justify-center shadow-xl bg-slate-200 px-4 '>
                <span>

                    <img src={
                        ftAmnt * 10 > 0 && ftAmnt * 10 < 1000
                            ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836232/bronze_b9ryxr.jpg'
                            : ftAmnt * 10 >= 1000 && ftAmnt * 10 < 10000
                                ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836199/silver_klhlqq.jpg'
                                : ftAmnt * 10 >= 10000 && ftAmnt * 10 < 25000
                                    ? 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836123/gold_gyd341.jpg'
                                    : 'https://res.cloudinary.com/dt21djrjq/image/upload/v1691836170/premium_ibxcpn.jpg'


                    } className='w-28 mt-4 rounded-md' />
                </span>
                <span className='mt-2'>
                    {ftName}
                </span>
                <span>
                    <span className='text-gray-600'>
                        Price:
                    </span>
                    <span className='font-extrabold ml-2 mb-2'>
                        {ftAmnt}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default TokenModal