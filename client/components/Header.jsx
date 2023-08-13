import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Center from './Center';
import { CartContext } from './CartContext';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
const StyledHeader = styled.header`
  background-color: #222;
position: sticky;
  top: 0;
 width: 100vw;
 z-index: 100;
 @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
    width: 100vw;
  }


  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    width: 100vw;
   
  }
`;

const Logo = styled(Link)`
    color:#fff;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 900;
`;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 0px ;

@media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
    
    justify-content: center;
  flex-wrap: wrap;
   
  }


  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    
    justify-content: center;
  flex-wrap: wrap;
   
  }


  
  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
   
    justify-content: center;
  flex-wrap: wrap;
  
   
  }



`;

const NavLink = styled(Link)`
color:#aaa;
text-decoration: none;
display: flex;
align-items: center;
padding: 0px 4px;
padding-bottom: 4px;

`;

const StyledNav = styled.nav`
display: flex;
gap: 15px;


@media screen and (max-width: 500px) {
  
  margin-top: 10px;
display: grid;
grid-template-columns: 1fr 1fr;

  }
`;

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const router = useRouter();
    const inActiveLink = ' ';
    const activeLink = 'border-b-2 border-gray-400 ';


    return (
        <>
            <StyledHeader>
                <Center>
                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, y: "-200px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "-200px" }}
                        transition={{ duration: 1 }}
                    >

                        <Wrapper >

                            <Logo href={'/'}>NextZone</Logo>



                            <StyledNav>
                                <NavLink href={'/'} className={router.pathname === '/' ? activeLink : inActiveLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                    Home</NavLink>
                                <NavLink href={'/products'} className={router.pathname === '/products' ? activeLink : inActiveLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    </svg>

                                    All Products</NavLink>
                                <NavLink href={'/categories'} className={router.pathname === '/categories' ? activeLink : inActiveLink}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                    </svg>

                                    Categories</NavLink>
                                <NavLink href={'/account'} className={router.pathname === '/account' ? activeLink : inActiveLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    Account</NavLink>
                                <NavLink href={'/cart'} className={router.pathname === '/cart' ? activeLink : inActiveLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>

                                    Cart ({cartProducts.length})</NavLink>
                            </StyledNav>


                        </Wrapper>
                    </motion.div >
                </Center>
            </StyledHeader>
        </>
    )
}
