import { CartContextProvider } from '@/components/CartContext';
import '@/styles/globals.css'
import { createGlobalStyle } from 'styled-components'
// import "../styles/global.css";
const GlobalStyles = createGlobalStyle`
body{
  background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
  padding: 0;
  margin: 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
