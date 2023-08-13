import React, { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { CartContext } from './CartContext';
const ProdBox = styled.div`
@media screen and (max-width: 500px) {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  }
`;
export default function Catprod({ products }) {
    const { addProduct } = useContext(CartContext);
    return (
        <>
            {
                products.map(prod => (
                    <>
                        <div key={prod._id}>
                            <ProdBox className='flex  p-4 items-center my-4 '>
                                <img src={prod.images[0]} alt="image" className='h-40 w-80 rounded-md shadow hover:scale-110' />
                                <div className='flex flex-col gap-4 px-4'>
                                    <span className='uppercase text-2xl'>

                                        {prod.title}
                                    </span>
                                    <span className='text-gray-500'>

                                        {prod.description.substring(0, 200)}...    <Link href={'/product/' + prod._id} className='text-black' >Read More</Link>
                                    </span>

                                    <span className='flex items-center justify-between'>
                                        <span>

                                            Price:
                                        </span>
                                        <span className='flex items-center gap-4'>

                                            <span className='text-2xl font-bold'>
                                                ₹{prod.price}
                                            </span>
                                            <span className='text-xl text-gray-400 bg-yellow-300 rounded-md px-2'>
                                                {prod.discount}% off
                                            </span>
                                        </span>

                                    </span>
                                    <span>
                                        <button className='bg-sky-300 rounded-md shadow px-4 py-2 hover:bg-sky-400 ml-auto flex items-center gap-2 justify-end'
                                            onClick={() => addProduct(prod._id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                            Add To Cart</button>
                                    </span>
                                </div>
                            </ProdBox>
                        </div>
                    </>
                ))
            }
        </>
    )
}
