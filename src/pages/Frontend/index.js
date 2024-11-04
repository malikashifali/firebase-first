import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import NoPage from './NoPage'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Index() {
    return (
        <>
        <Header />
        <main>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
        </main>
        <Footer />
        </>
    )
}
