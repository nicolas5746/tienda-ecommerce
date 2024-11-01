import React from 'react';
import { ItemContext } from '@/contexts/Contexts';
import ItemDetail from '@/components/product/ItemDetail';
import Spinner from '@/layouts/Spinner';

const Product = () => {
    // Context
    const { items } = React.useContext(ItemContext);

    return (
        <>
            {items.length >= 1 ? <ItemDetail /> : <Spinner />}
        </>
    );
}

export default Product;