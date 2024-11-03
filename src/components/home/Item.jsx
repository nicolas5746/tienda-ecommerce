import React from 'react';
import PropTypes from 'prop-types';
import { CartContext, ItemContext } from '@/contexts/Contexts';
import IsInCart from '@/components/cart/IsInCart';
import ItemImage from '@/components/product/ItemImage';

const Item = ({ item }) => {
    // Context
    const { handleAddToCart } = React.useContext(CartContext);
    const { getItemModel } = React.useContext(ItemContext);

    return (
        <div className='group relative flex flex-col justify-center'>
            <ItemImage item={item} optionalText='' />
            <div className='flex flex-col items-center justify-between mt-4'>
                <h2 className='text-center text-5lg xl:text-xl text-tomato-sauce capitalize p-[1%] whitespace-nowrap'>{item.brand}</h2>
                {getItemModel(item, { whiteSpace: 'nowrap' })}
                <p className='text-center text-5lg text-tomato-sauce font-semibold uppercase p-[1%]'>usd&nbsp;{item.price_usd}</p>
                <IsInCart id={item.id} onClick={() => handleAddToCart(item)} />
            </div>
        </div>
    );
}

Item.propTypes = { item: PropTypes.object }

export default Item;