import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartContext, ItemContext } from '@/contexts/Contexts';
import { RemoveItemIcon } from '@ui/Icons';

const ItemImage = ({ item, linkStyle, optionalText }) => {
    // Context
    const { handleIsInCart, handleRemoveFromCart, handleNotification } = React.useContext(CartContext);
    const { getItemImage } = React.useContext(ItemContext);

    return (
        <div className='relative min-h-100 text-gray-500 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80'>
            <>
                <Link to={`/product/${item.id}`} aria-label='item-id' style={linkStyle}>
                    {getItemImage(item)}
                    <span className='absolute flex items-end justify-center text-center text-xs 2sm:text-2xs 3md:text-3xs xl:text-5xs text-roman-silver font-normal font-lato bottom-[18%] lg:bottom-[2%] w-full'>
                        {optionalText.charAt(0).toUpperCase() + optionalText.slice(1).toLowerCase()}
                    </span>
                </Link>
                {handleIsInCart(item.id) &&
                    <RemoveItemIcon
                        color='disabled'
                        fontSize='small'
                        onClick={() => handleNotification({ accept: () => handleRemoveFromCart(item.id, false), decline: () => handleRemoveFromCart(item.id, true), declinable: true, show: true }, '¿Deseas eliminar éste producto de tu carrito?')}
                        style={{ cursor: 'pointer', left: '2%', position: 'absolute', top: '2%' }}
                        title='Eliminar'
                    />}
            </>
        </div >
    );
}

ItemImage.propTypes = {
    item: PropTypes.object,
    linkStyle: PropTypes.object,
    optionalText: PropTypes.string
}

export default ItemImage;