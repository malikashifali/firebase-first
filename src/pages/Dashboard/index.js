import React from 'react'
import { Route, Routes } from 'react-router-dom'

// pages 
import Home from './Home'
import About from './About'
import AddProduct from './AddProduct'
import ShowProducts from './ShowProducts'
import NoPage from 'pages/Frontend/NoPage'

// components 
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Index() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='add-product' element={<AddProduct />} />
                    <Route path='show-products' element={<ShowProducts />} />
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
