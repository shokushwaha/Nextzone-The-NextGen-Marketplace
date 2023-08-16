import React from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import icon1 from '@/public/visa.png'
import icon2 from '@/public/paypal.jpg'
import icon3 from '@/public/income.jpg'
import icon4 from '@/public/discover.jpg'
import Image from 'next/image';
import KommunicateChat from '@/pages/chatbot';

const Footer = () => {
    return (
        <div className='bg-neutral-800 text-gray-400 mt-6'>
            <KommunicateChat/>
            <Stack direction={'row'} gap={9} pl='5%' pt='4%'>
                <Stack direction={'column'}>
                    <Typography fontWeight={'900'}>ABOUT US</Typography>
                    <Typography>Blog</Typography>
                    <Typography>Legal Notice</Typography>
                    <Typography>Secure payment</Typography>
                    <Typography>Terms and Condition</Typography>
                </Stack>
                <Stack direction={'column'}>
                    <Typography fontWeight={'900'}>ACCOUNT</Typography>
                    <Typography>My Account</Typography>
                    <Typography>Login</Typography>
                    <Typography>Identity</Typography>
                    <Typography>Order history</Typography>
                </Stack>
                <Stack direction={'column'} fontWeight={'700'}>
                    <Typography fontWeight={'900'}>HELP & CONTACT</Typography>
                    <Typography>Contact us</Typography>
                    <Typography>Return</Typography>
                    <Typography>Shipping</Typography>
                    <Typography>FAQ #</Typography>
                </Stack>
                <Stack direction={'column'} >
                    <Typography fontWeight={'900'}>SHOP</Typography>
                    <Typography>Performance</Typography>
                    <Typography>Details</Typography>
                </Stack>
                <Stack direction={'column'} pl={'9%'}>
                    <Typography fontWeight={'700'}>SIGN UP</Typography>
                    <Typography pb='3%'>You may unsubscribe at any moment. For that purpose, please find our <br />
                        contact info in the legal notice.</Typography>
                    <Stack direction={'row'}>
                        <TextField placeholder={'Your email address'}
                            sx={{
                                width: '60%',
                                "& .MuiInputBase-root": {
                                    height: 39,
                                    bgcolor: 'white',
                                    borderRadius: '0px'
                                }
                            }}
                        ></TextField>
                        <Button variant='contained' sx={{ borderRadius: '2px', '&:hover': { bgcolor: '#57606f' } }}
                        >SUBSCRIBE</Button>
                    </Stack>
                    <Typography fontWeight={'700'} pt='4%'>FOLLOW US</Typography>
                    <Stack direction={'row'} gap={0.2}>
                        <FacebookRoundedIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                        <YouTubeIcon />
                    </Stack>
                </Stack>
            </Stack>

            <div className='bg-neutral-900 flex items-center justify-center py-3 mt-4'>
                &copy; 2023- Hack Wizards - Flipkart Grid 5.0 | All Rights Reserved
            </div>

        </div>
    )
}

export default Footer