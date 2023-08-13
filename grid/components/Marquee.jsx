import React from 'react'

const Marquee = () => {
    return (
        <>
            <marquee behavior="scroll" direction="right" className="bg-neutral-800 py-2 "  >
                <span className='text-gray-100 font-extrabold text-md'>
                    We are introducing custom clothes. Try it now!!
                </span>
            </marquee>
        </>
    )
}

export default Marquee