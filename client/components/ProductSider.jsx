import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import axios from 'axios';
import ProductBox from './ProductBox';
import ProductBoxSemi from './ProductBoxSemi';
const ProductSider = () => {
    const { loggedInUser } = useContext(CartContext);
    const userId = loggedInUser.data._id;

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await axios.post("/api/fetchrecommendation", { userId });
        let arr = res.data
        arr = arr.reverse()
        arr = arr.slice(0, 8)
        setRecommendedProducts(arr);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    if (recommendedProducts.length === 0)
        return <>

        </>
    return (
        <>
            <div className='bg-white px-8 flex flex-col items-center pt-6 min-h-[90vh] w-[500px]'>

                <div className='text-3xl flex items-center justify-center text-center font-extrabold uppercase'>Continue shopping for....</div>
                <div className='flex flex-wrap gap-4'>

                    {recommendedProducts.length > 0 && recommendedProducts.map(product => (
                        <div key={product._id}>
                            <ProductBoxSemi {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductSider