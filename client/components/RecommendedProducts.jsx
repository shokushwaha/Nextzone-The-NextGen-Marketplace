import React, { useContext, useEffect } from 'react'
import { CartContext } from './CartContext'
import axios from 'axios';
const Recommendation = ({ prodNum }) => {
    const { loggedInUser } = useContext(CartContext);
    const userId = loggedInUser.data._id;


    const fetchProducts = async () => {
        const res = await axios.post("/api/fetchrecommendation", { userId });
        console.log(res);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div>Recommendation</div>
    )
}

export default Recommendation