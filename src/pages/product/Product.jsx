import React from 'react';
import { ItemContext } from '@contexts/Contexts';
import ItemDetail from '@components/product/itemDetail/ItemDetail';
import Spinner from '@ui/spinner/Spinner';
import scrollToTop from '@utils/scrollToTop';

const Product = () => {
    // Context
    const { items } = React.useContext(ItemContext);

    return (
        <>
            {scrollToTop()}
            {items.length >= 1
                ?
                <ItemDetail />
                :
                <Spinner />
            }
        </>
    );
}

export default Product;