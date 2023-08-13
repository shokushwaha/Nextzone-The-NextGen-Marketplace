import Layout from "@/components/Layout";
import axios from "axios";
import Swal from 'sweetalert2'
import Head from "next/head";
import { useRouter } from "next/router";

export default function Settings() {

    const router = useRouter();

    const clearProductsDb = async () => {
        await axios.get('/api/delproducts');
        Swal.fire(
            'Deleted Products!',
            'Product Database is empty Now!',
            'success'
        )
    }

    const clearCateogriesDb = async () => {
        await axios.get('/api/delcategories');
        Swal.fire(
            'Deleted Categories!',
            'Categories Database is empty Now!',
            'success'
        )
    }

    const addAdmin = async () => {
        Swal.fire({
            title: "Enter email you want to provide admin access!",
            text: "This action provides all access to the user you want to add!",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if (result.value) {
                const email = result.value;
                axios.post('/api/admin', { email }).then(() => {
                    Swal.fire(
                        'Admin added!',
                        'Head admin will verify and add it',
                        'success'
                    )
                })
            }
            else {
                Swal.fire(
                    'Email cannot be empty!',
                    'error'
                )
            }
        });
    }

    return (
        <Layout>
            <Head><title>Settings</title></Head>
            <h1 className="text-black font-bold text-3xl flex items-center gap-2 pt-4 px-2">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
            </h1>
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex gap-2 items-center justify-between  border-l-2 border-gray-400 pl-4 w-3/5">

                    Add Admin
                    <button
                        className="bg-green-300 rounded-md py-1 px-3  flex items-center gap-2    hover:bg-green-500"

                        onClick={addAdmin}
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>

                        Add Admin</button>
                </div>


                <div className="flex gap-2 items-center justify-between  border-l-2 border-gray-400 pl-4 w-3/5">

                    Manage Offers
                    <button
                        className="bg-yellow-300 rounded-md py-1 px-3  flex items-center gap-2    hover:bg-yellow-500"

                        onClick={() => router.push('/products')}
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>


                        Manage Offers</button>
                </div>

                <div className=" flex gap-2 items-center justify-between  border-l-2  border-gray-400 pl-4 w-3/5">

                    Clear Products Database?
                    <button
                        className=" bg-red-300 rounded-md py-1 px-3 flex items-center gap-2   hover:bg-red-500"

                        onClick={clearProductsDb}

                    ><svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Clear Products</button>
                </div>
                <div className="flex gap-2 items-center justify-between border-l-2 border-gray-400 pl-4 w-3/5">

                    Clear Categories Database?
                    <button
                        className="bg-red-300 rounded-md py-1 px-3  flex items-center gap-2    hover:bg-red-500"

                        onClick={clearCateogriesDb}
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"

                    >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Clear Categories</button>
                </div>


            </div>
        </Layout>
    );
}
