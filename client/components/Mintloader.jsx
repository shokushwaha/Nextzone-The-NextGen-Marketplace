import React from 'react'

const Mintloader = () => {
    return (
        <>
            <div className='flex items-center justify-center h-[100vh] w-full '>

                <div className="ui-abstergo">
                    <div className="abstergo-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="ui-text">
                        Minting Token
                        <div className="ui-dot"></div>
                        <div className="ui-dot"></div>
                        <div className="ui-dot"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mintloader