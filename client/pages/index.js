import { CartContext } from '@/components/CartContext';
import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import Navbar from '@/components/Navbar';
import PleaseLogin from '@/components/PleaseLogin';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import { Toaster, toast } from 'react-hot-toast';
import CustomizationButton from '@/components/CustomizationButton';
import Marquee from '@/components/Marquee';
import { ProductHistory } from '@/models/ProductHistory';
import Recommendation from '@/components/RecommendedProducts';
export default function Home({ featuredProduct, newProducts }) {
  const { loggedIn, setLoggedInUser, ConnectToWallet, connectWallet, currentAccount
  } = useContext(CartContext);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;


  const [online, setOnline] = useState(false);
  useEffect(() => {
    setOnline(window.navigator.onLine);
    if (ls) {
      const user = JSON.parse(ls.getItem('loggedInUser'))
      setLoggedInUser(user);
    }
  }, [])


  if (!online) (
    <>
      <span>Connect to the internet!....</span>

    </>
  )

  useEffect(() => {
    ConnectToWallet();
    connectWallet();
    if (currentAccount !== "") {
      toast.success("Metamask connected successfully!")
    }
  }, []);


  return (
    <>
      <Head>
        <title>NextZone - Home</title>

      </Head>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {loggedIn ?
        <div div className='overflow-x-hidden'>
          <Marquee />
          <Navbar />
          <Featured product={featuredProduct} />
          <Recommendation prodNum={5} />
          <NewProducts products={newProducts} />
          <Footer />
        </div>
        :
        <>
          <PleaseLogin />
        </>
      }
    </>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '64d89d0572e2ecffef27785a'; // cloud
  // const featuredProductId = '645cd08094bda36bef3ee40d'; // local
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 20 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}