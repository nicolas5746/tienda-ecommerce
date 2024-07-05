import React from 'react';
import { useParams } from 'react-router-dom';
import { CartContext, ItemContext } from '@contexts/contexts';
import ItemImage from '@components/product/itemImage/ItemImage';
import IsInCart from '@ui/isInCart/IsInCart';
import Spacer from '@ui/spacer/Spacer';

const ItemDetail = () => {
    // Context
    const { handleAddToCart } = React.useContext(CartContext);
    const { items, getItemCategory, getItemColour, getItemModel } = React.useContext(ItemContext);
    // Dynamic parameter
    const { id } = useParams();

    return (
        <div className='container'>
            {items
                .filter((item) => item.id === id)
                .map((item, index) => (
                    <div className='card' key={index}>
                        <ItemImage item={item} optionalText={`código del artículo: ${item.id}`} linkStyle={{ pointerEvents: 'none' }} />
                        <div className='mt-4 flex justify-between'>
                            <h2 className='brand'>{item.brand}</h2>
                            {getItemModel(item, { whiteSpace: 'nowrap' })}
                            <Spacer value={1} />
                            {getItemCategory(item)}
                            {item.stock >= 1
                                ?
                                <>
                                    {getItemColour(item)}
                                    <Spacer value={1} />
                                    <p className='grey-header' style={{ fontWeight: '600' }}>hay stock disponible!</p>
                                </>
                                :
                                <p className='out-of-stock'>lo sentimos, no hay stock disponible!</p>
                            }
                            <Spacer value={1.5} />
                            <p className='grey-header'>precio:</p>
                            <p className='price'>usd&nbsp;{item.price_usd}</p>
                            <IsInCart id={item.id} onClick={() => handleAddToCart(item)} />
                        </div>
                    </div>))
            }
        </div>
    );
}

export default ItemDetail;