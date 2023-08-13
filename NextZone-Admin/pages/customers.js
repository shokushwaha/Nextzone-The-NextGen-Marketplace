import Layout from '@/components/Layout'
import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import React, { useState, useEffect } from 'react'

export default function Customers({ customers }) {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(customers);
    })
    return (
        <Layout>

            <div>
                <h1 className='flex gap-2 items-center text-4xl text-black px-4 py-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Customers</h1>

                <table className='basic px-4'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Total number of orders</th>
                            <th>Total number items in cart</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map(user => (
                            <tr key={user._id}>


                                <td>

                                    {user.name}
                                </td>
                                <td>

                                    {user.email}

                                </td>

                                <td>
                                    {user.phoneNum}

                                </td>

                                <td>

                                    {user.address}
                                </td>
                                <td>

                                    {user?.orders.length}
                                </td>
                                <td>

                                    {user?.cart.length}
                                </td>

                            </tr>


                        ))}
                    </tbody>
                </table>

            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();

    const customers = await Client.find({});
    return {
        props: {

            customers: JSON.parse(JSON.stringify(customers)),
        }
    }
}
