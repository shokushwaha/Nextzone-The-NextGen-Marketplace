import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { PodOrder } from "@/models/PodOrder";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
    const {
        name, email, city,
        postalCode, streetAddress, country,
        cartProducts, discountedPrice
    } = req.body;
    await mongooseConnect();
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: { name: productInfo.title },
                    unit_amount: discountedPrice * 100,
                },
            });
        }
    }

    const orderDoc = new PodOrder({
        line_items, name, email, city, postalCode,
        streetAddress, country, paid: false,
    });

    await orderDoc.save();

    res.json({
        orderDoc
    })

}