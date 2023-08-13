import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;

    const deleteProduct = async () => {
        await axios.delete(`/api/products?id=${id}`)
        router.push('/products');
    }

    return (
        <Layout>
            <Head><title>Delete Product</title></Head>
            <div className="m-4 flex items-center flex-col">
                <p className="text-blue-900 text-xl my-4">You want to delete this product ?</p>
                <div className="flex my-4 gap-4">
                    <button className="bg-orange-700 text-white rounded-md px-5 p-2" onClick={deleteProduct}>Yes</button>
                    <Link href={"/products"} className="bg-blue-900 rounded-md text-white p-2">
                        Cancel
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
