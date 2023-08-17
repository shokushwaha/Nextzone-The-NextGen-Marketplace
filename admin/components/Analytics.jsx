import { mongooseConnect } from "@/lib/mongoose";
import { Client } from "@/models/Customer";
import { Order } from "@/models/Orders";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react"
import { DotLoader } from 'react-spinners'


export default function Analytics() {

    const [loading, setLoading] = useState(true);
    const [countProducts, setCountProducts] = useState(0);
    const [countCategories, setCountCategories] = useState(0);
    const [orders, setOrders] = useState([]);
    const [orderItemQuantity, setOrderItemQuantity] = useState(0);
    const [paidOrders, setPaidOrders] = useState(0);
    const [sales, setSales] = useState(0);
    const [adminCount, setAdminCount] = useState(0);

    useEffect(() => {

        fetchOrderDetails();
        fetchProducts();
        fetchCategories();
        fetchAdmin();
        setLoading(false);

    }, [])
    const fetchAdmin = async () => {
        const response = await axios.get('/api/admin');
        console.log(response.data)
        setAdminCount(response.data.length);
    }
    const fetchProducts = async () => {
        const response = await axios.get('/api/countproducts');
        setCountProducts(response.data);


    }
    const fetchCategories = async () => {
        const response = await axios.get('/api/countcategories');
        setCountCategories(response.data);

    }
    const fetchOrderDetails = async () => {

        await axios.get('/api/orders').then(response => {

            setOrders(response.data);


        })


    }

    let paidNums = 0;
    let salesNum = 0;
    let orderItemNum = 0;
    for (let i = 0; i < orders.length; i++) {
        let info = orders[i].line_items;

        for (let j = 0; j < info.length; j++) {
            let x = info[j].quantity;
            let y = info[j].price_data.unit_amount;
            orderItemNum = orderItemNum + x;
            salesNum = salesNum + x * y;
        }
        if (orders[i].paid === true)
            paidNums++;
    }





    return (
        <div className="overflow-x-hidden ">


            <div className="flex items-center text-3xl px-4 pb-4 mb-4 w-full border-b-2 border-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
                Analytics
            </div>

            {
                loading ?
                    <div className=" flex flex-col gap-4 items-center justify-center h-90 pt-40">
                        <DotLoader />
                        Hold on, Loading....
                    </div>
                    :
                    <div className="flex  gap-16 flex-wrap pb-10 px-4">


                        <div className="stat-box bg-gradient-to-r from-green-200 to-green-500 border-b-4 border-green-600 rounded-md shadow-lg shadow-green-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                            </div>
                            <div className="stat-data">
                                <span>

                                    Total Products
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {countProducts}
                                </span>
                            </div>
                        </div>


                        <div className="stat-box bg-gradient-to-r from-pink-200 to-pink-400 border-b-4 border-pink-600 rounded-md shadow-lg shadow-pink-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                </svg>

                            </div>
                            <div className="stat-data">
                                <span>

                                    Total Categories
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {countCategories}
                                </span>
                            </div>
                        </div>


                        <div className="stat-box bg-gradient-to-r from-yellow-100 to-yellow-300 border-b-4 border-yellow-600 rounded-md shadow-lg shadow-yellow-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>



                            </div>
                            <div className="stat-data">
                                <span>

                                    Total Admins
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {adminCount}
                                </span>
                            </div>
                        </div>

                        <div className="stat-box bg-gradient-to-l from-sky-100 to-sky-300 border-b-4 border-sky-600 rounded-md shadow-lg shadow-sky-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>




                            </div>
                            <div className="stat-data">
                                <span>

                                    Total Sales
                                </span>
                                <span className="text-auto mt-2 font-extrabold text-center">

                                    ₹{salesNum}
                                </span>
                            </div>
                        </div>

                        <div className="stat-box bg-gradient-to-l from-orange-100 to-orange-300 border-b-4 border-orange-600 rounded-md shadow-lg shadow-orange-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>




                            </div>
                            <div className="stat-data">
                                <span>

                                    Total Orders
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {orders.length}
                                </span>
                            </div>
                        </div>


                        <div className="stat-box bg-gradient-to-l from-gray-200 to-gray-400 border-b-4 border-gray-600 rounded-md shadow-lg shadow-gray-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>



                            </div>
                            <div className="stat-data">
                                <span>

                                    Total Paid Orders
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {paidNums}
                                </span>
                            </div>
                        </div>

                        <div className="stat-box bg-gradient-to-r from-teal-200 to-teal-400 border-b-4 border-teal-600 rounded-md shadow-lg shadow-teal-800">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                </svg>
                            </div>
                            <div className="stat-data">
                                <span className="text-center">

                                    Total Unpaid Orders
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {orders && orders.length - paidNums}
                                </span>
                            </div>
                        </div>

                        <div className="stat-box bg-gradient-to-r from-indigo-200 to-indigo-400 border-b-4 border-indigo-600 rounded-md shadow-lg shadow-indigo-800 ">
                            <div className="stat-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>

                            </div>
                            <div className="stat-data">
                                <span className="text-center">
                                    Total Items Sold
                                </span>
                                <span className="text-4xl mt-2 font-extrabold text-center">
                                    {orderItemNum}
                                </span>
                            </div>
                        </div>
                    </div >
            }
        </div>
    )
}
