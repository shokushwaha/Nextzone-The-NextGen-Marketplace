import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import Head from "next/head";
export default function NewProduct() {
    return (
        <Layout>
            <Head><title>Add New Product</title></Head>
            <div className="m-4">
                <h1>Add Product</h1>
                <ProductForm />
            </div>
        </Layout>
    );
}
