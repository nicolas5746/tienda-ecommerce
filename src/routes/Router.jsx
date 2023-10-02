import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '@layouts/footer/Footer';
import Navbar from '@layouts/navbar/Navbar';
import Cart from '@pages/cart/Cart';
import Home from '@pages/home/Home';
import NotFound from '@pages/notFound/NotFound';
import Product from '@pages/product/Product';
import CartProvider from '@providers/cart/CartProvider';
import ItemProvider from '@providers/item/ItemProvider';
import OrderProvider from '@providers/order/OrderProvider';

const Router = () => {

    return (
        <ItemProvider>
            <CartProvider>
                <OrderProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path={`/`} element={<Home />} />
                            <Route path={`/category/:category`} element={<Home />} />
                            <Route path={`/product/:id`} element={<Product />} />
                            <Route path={`/cart`} element={<Cart />} />
                            <Route path={`/*`} element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </OrderProvider>
            </CartProvider>
        </ItemProvider>
    );
}

export default Router;