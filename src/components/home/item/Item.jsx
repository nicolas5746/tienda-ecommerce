import React from 'react';
import PropTypes from 'prop-types';
import { CartContext, ItemContext } from '@contexts/contexts';
import ItemImage from '@components/product/itemImage/ItemImage';
import IsInCart from '@ui/isInCart/IsInCart';

const Item = ({ item }) => {
    // Context
    const { handleAddToCart } = React.useContext(CartContext);
    const { getItemModel } = React.useContext(ItemContext);

    return (
        <div
            className='group relative'
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            <ItemImage
                item={item}
                optionalText={''}
            />
            <div className='mt-4 flex justify-between'>
                <h2 className='brand'>{item.brand}</h2>
                {getItemModel(item, { whiteSpace: 'nowrap' })}
                <p className='price' >{`usd ${item.price_usd}`}</p>
                <IsInCart id={item.id} onClick={() => handleAddToCart(item)} />
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.object
}

export default Item;