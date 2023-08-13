import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState({});

    useEffect(() => {
        if (!id) return;

        axios
            .get(`/api/products?id=${id}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            });

    }, [id]);

    return (
        <Layout>
            <Head><title>Edit Product</title></Head>
            <div className="m-4">
                <h1>Edit Product</h1>
                {Object.keys(product).length > 0 && <ProductForm {...product} />}
            </div>
        </Layout>
    );
}
