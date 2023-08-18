import React from 'react'

const ExpiredToken = ({ name, symbol, price, issued, hash }) => {
    function formatDate(inputDateString) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const inputDate = new Date(inputDateString);
        const day = inputDate.getDate();
        const month = inputDate.getMonth() + 1;
        const year = inputDate.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

        return formattedDate;
    }
    let issueDate = new Date(issued);
    issueDate = formatDate(issueDate.toDateString().substring(4, 15))
    let expiryDate = new Date(issued);
    expiryDate.setDate(expiryDate.getDate() + 7);
    expiryDate = formatDate(expiryDate.toDateString().substring(4, 15))

    return (
        <>
            <div className='flex flex-col shadow-xl p-2  rounded-md m-4 items-center bg-slate-100  hover:scale-105 transition delay-150 duration-300 ease-in-out  w-[12vw] z-[-1] opacity-50'>
                <div className=' w-36 rounded-md   '>
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
                    <span className='flex items-center '>
                        <span className='text-gray-500 font-bold'>
                            Issued :
                        </span>
                        <span className=''>
                            {issueDate}
                        </span>
                    </span>
                    <span className='flex items-center '>
                        <span className='text-gray-500 font-bold'>
                            Expired:
                        </span>
                        <span className=''>
                            {expiryDate}
                        </span>
                    </span>

                </div>

            </div>
        </>
    )
}

export default ExpiredToken