import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Product from '@/pages/Product';
import CartProvider from '@/providers/CartProvider';
import ItemProvider from '@/providers/ItemProvider';
import OrderProvider from '@/providers/OrderProvider';

const Router = () => {

    React.useLayoutEffect(() => {
        document.body.style.backgroundColor = '#faf0e6';
    }, []);

    return (
        <ItemProvider>
            <CartProvider>
                <OrderProvider>
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/category/:category' element={<Home />} />
                            <Route path='/product/:id' element={<Product />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/'>
                                <Route path='*' element={<NotFound />} />
                            </Route>
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </OrderProvider>
            </CartProvider>
        </ItemProvider>
    );
}

export default Router;