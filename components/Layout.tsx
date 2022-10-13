import React from 'react'
import Head from 'next/head'
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

interface LayoutProps {
    children:React.ReactNode
}

export default function Layout({children}:LayoutProps) {
    return (
        <div>
            <Head>
            <title>Statistic app</title>
            <meta name="description" content="Statistic using Next.js and GraphQL" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className=''>
            {children}
            </main>
            <Footer />
        </div>
    )
}