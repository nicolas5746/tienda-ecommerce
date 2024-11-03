import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ItemContext } from '@/contexts/Contexts';
import ItemDetail from '@/components/product/ItemDetail';
import Notification from '@/layouts/Notification';
import Spinner from '@/layouts/Spinner';

const Product = () => {
    // Context
    const { items } = React.useContext(ItemContext);
    // Dynamic parameter
    const { id } = useParams();
    // Access to location object
    const location = useLocation();

    return (
        <>
            {items.length >= 1 ? <ItemDetail /> : <Spinner />}
            {location.pathname === `/product/${id}` && <Notification />}
        </>
    );
}

export default Product;