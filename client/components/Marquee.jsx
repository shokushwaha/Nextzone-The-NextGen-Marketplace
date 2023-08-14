import React from 'react'

const Marquee = () => {
    return (
        <>
            <marquee onClick={() => window.open("https://nextzone-customization.netlify.app/", "_blank")} behavior="scroll" scrollamount="13" onmouseover="this.stop()" onmouseout="this.start()" direction="right" className="bg-neutral-800 cursor-pointer"  >
                <span className='text-gray-100 font-extrabold text-md'>
                Introducing custom clothes! Finally, clothes that fit you perfectly and make you look your best. <span className='text-yellow-600'>TRY IT NOW</span>
                </span>
            </marquee>
        </>
    )
}

export default Marquee