import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ReactSortable } from "react-sortablejs";
import Cookies from "js-cookie";
import { SyncLoader } from "react-spinners";

export default function ProductForm({
    _id,
    title,
    description,
    price,
    images: oldImages,
    category,
    properties,
    discount
}) {
    const router = useRouter();
    const [productData, setProductData] = useState({
        _id: _id || null,
        title: title || "",
        description: description || "",
        price: price || "",
        images: oldImages || [],
        category: category || null,
        properties: properties || [],
        discount: discount || 0
    });

    const [categoriesList, setCategoriesList] = useState([]);
    const [images, setImages] = useState(productData.images || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categoryProperties, setCategoryProperties] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: name === "category" && value === "" ? null : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrfToken = Cookies.get("next-auth.csrf-token");

        if (productData._id) {
            await axios.put("/api/products", productData, {
                headers: { "CSRF-Token": csrfToken },
            });
        } else {
            await axios.post("/api/products", productData, {
                headers: { "CSRF-Token": csrfToken },
            });
        }
        router.push("/products");
    };

    async function uploadImages(e) {
        const files = e.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", "ecomnext")
        }

        setIsUploading(true);
        const data = await axios
            .post("https://api.cloudinary.com/v1_1/dt21djrjq/image/upload",
                formData
            )
            .then((response) => {
                console.log(response.data.secure_url)
                setImages([...images, response.data.secure_url]);
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
            .finally(() => setIsUploading(false));

    }

    useEffect(() => {
        axios.get("/api/categories").then((response) => {
            setCategoriesList(response.data);
        });
    }, []);

    useEffect(() => {
        setProductData((p) => ({
            ...p,
            images,
        }));
    }, [images]);

    const handleSelectedProperties = (index, value) => {
        const properties = productData?.properties.map((item, i) => {
            item.values = i === index ? value : item.values;
            return item;
        });

        setProductData((p) => ({
            ...p,
            properties,
        }));
    };

    const getCategoryProperties = async (_id) => {
        const response = await axios.get("/api/categories", { params: { _id } });
        return response.data;
    };

    const propertiesInitialized = useRef(false);

    useEffect(() => {
        if (!productData.category) {
            return;
        }

        const defaultProductProperties = [];
        getCategoryProperties(productData.category).then((category) => {
            setCategoryProperties(category?.properties);

            category?.properties.map(({ _id, name }) => {
                const existingProductProperty = productData.properties.find(
                    (existingItem) => existingItem.property === _id
                );
                defaultProductProperties.push({
                    property: _id,
                    name,
                    values: existingProductProperty?.values || "",
                });
            });

            while (category?.parent_id) {
                const category = getCategoryProperties(category?.parent_id).then(() => {
                    setCategoryProperties((prev) => [...prev, category?.properties]);

                    category?.properties.map(({ _id, name }) => {
                        const existingProductProperty = productData.properties.find(
                            (existingItem) => existingItem.property === _id
                        );
                        defaultProductProperties.push({
                            property: _id,
                            name,
                            values: existingProductProperty?.values || "",
                        });
                    });
                });
            }
        });

        if (!propertiesInitialized.current) {
            setProductData((p) => ({
                ...p,
                properties: defaultProductProperties,
            }));
            propertiesInitialized.current = true;
        }
    }, [productData.category, productData.properties]);




    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Product title</label>
            <input
                type="text"
                placeholder="name"
                name="title"
                required
                onChange={handleChange}
                value={productData.title}
            />

            <label>Category</label>
            {categoriesList.length ? (
                <select
                    required
                    onChange={handleChange}
                    name="category"
                    defaultValue={productData.category}
                >
                    <option value="">Select Category</option>
                    {categoriesList.map((item, i) => (
                        <option key={i} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            ) : (
                <input value="Select category" readOnly />
            )}

            {productData.properties && categoryProperties.length > 0 ? (
                <div>
                    {categoryProperties.map((property, i) => {
                        const existingProductProperty = productData.properties.find(
                            (existingItem) => existingItem.property === property._id
                        );
                        return (
                            <div key={i} className="flex gap-1 mb-2 w-3/4">
                                <input
                                    readOnly
                                    type="text"
                                    value={property.name}
                                    className="mb-0 w-1/3"
                                />
                                <select
                                    className="mb-0"
                                    required
                                    value={existingProductProperty?.values || ''}
                                    onChange={(e) => handleSelectedProperties(i, e.target.value)}
                                >
                                    <option value="">Select variant</option>
                                    {property.values?.split(",").map((value, i) => (
                                        <option key={i} value={value.trim()}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            ) : null}

            <label>Product description</label>
            <textarea
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={productData.description}
            ></textarea>

            <label>Price (in INR)</label>
            <input
                type="number"
                placeholder="price"
                name="price"
                required
                onChange={handleChange}
                value={productData.price}
            />
            <label>Discount(%)</label>
            <input
                type="number"
                placeholder="discount"
                name="discount"
                required
                onChange={handleChange}
                value={productData.discount}
            />

            <label>Photos</label>
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                </svg>
                <div>Add image</div>
                <input type="file" onChange={uploadImages} className="hidden" />
            </label>

            {!images.length ? (
                <div className="my-2 text-sm">No photos are available</div>
            ) : (
                <div className="flex gap-3 my-2">
                    <ReactSortable
                        list={images}
                        setList={setImages}
                        className="flex gap-3"
                    >
                        {images.map((item, i) => (
                            <div key={i}>


                                <img src={item} alt="product image" className="w-60  rounded-md mb-10" />
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="py-4 w-20 h-20">
                            <SyncLoader />
                        </div>
                    )}
                </div>

            )}

            <div className="flex gap-4">

                <button className="flex  rounded-md py-1 px-3 items-center bg-green-400 shadow-md hover:bg-green-500">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>

                    Save</button>
                <button onClick={() => router.back()} className="flex  rounded-md py-1 px-3 items-center bg-red-400 shadow-md hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>


                    Cancel
                </button>

            </div>
        </form>
    );
}
