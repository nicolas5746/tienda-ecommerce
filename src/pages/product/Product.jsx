import React from 'react';
import { ItemContext } from '@contexts/contexts';
import { scrollToTop } from '@utils/utils';
import ItemDetail from '@components/product/itemDetail/ItemDetail';
import Spinner from '@ui/spinner/Spinner';

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