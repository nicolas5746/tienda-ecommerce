import React from 'react';
import { useParams } from 'react-router-dom';
import { CartContext, ItemContext } from '@/contexts/Contexts';
import IsInCart from '@/components/cart/IsInCart';
import ItemImage from '@/components/product/ItemImage';
import Spacer from '@ui/Spacer';

const ItemDetail = () => {
    // Context
    const { handleAddToCart } = React.useContext(CartContext);
    const { items, getItemCategory, getItemColour, getItemModel } = React.useContext(ItemContext);
    // Dynamic parameter
    const { id } = useParams();

    return (
        <section className='flex flex-col items-center justify-center bg-linen m-[0 auto] p-[25%] 2sm:p-[12%] 3md:p-[10%] xl:p-[8%]'>
            {items.filter((item) => item.id === id).map((item, index) => (
                <div className='bg-gainsboro p-[3%]' key={index}>
                    <ItemImage item={item} optionalText={`código del artículo: ${item.id}`} linkStyle={{ pointerEvents: 'none' }} />
                    <div className='mt-4 flex flex-col items-center justify-between'>
                        <h2 className='text-center text-2xl text-tomato-sauce capitalize p-[1%] whitespace-nowrap'>{item.brand}</h2>
                        {getItemModel(item, { whiteSpace: 'nowrap' })}
                        <Spacer value={1} />
                        {getItemCategory(item)}
                        {item.stock >= 1 ?
                            <>
                                {getItemColour(item)}
                                <Spacer value={1} />
                                <p className='text-center text-roman-silver text-3sm first-letter:uppercase font-semibold'>hay stock disponible!</p>
                            </>
                            :
                            <p className='text-center text-2sm text-tomato-sauce font-semibold uppercase m-[5%] p-[1%] whitespace-normal'>lo sentimos, no hay stock disponible!</p>
                        }
                        <Spacer value={1.5} />
                        <p className='text-center text-roman-silver text-2sm first-letter:uppercase'>precio:</p>
                        <p className='text-center text-5lg text-tomato-sauce font-semibold uppercase'>usd&nbsp;{item.price_usd}</p>
                        <IsInCart id={item.id} onClick={() => handleAddToCart(item)} />
                    </div>
                </div>))}
        </section>
    );
}

export default ItemDetail;