import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, ItemContext } from '@contexts/contexts';
import { Close } from '@ui/icons/Icons';
import CartOrder from '@components/cart/cartOrder/CartOrder';
import ItemImage from '@components/product/itemImage/ItemImage';
import Counter from '@ui/counter/Counter';
import Spacer from '@ui/spacer/Spacer';
import TotalPrice from '@ui/totalPrice/TotalPrice';
import './cartTable.sass';

const CartTable = ({ items, currency }) => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { handleSubTotalPrice, handleTotalPrice, handleIncreaseItem, handleDecreaseItem } = React.useContext(CartContext);
    const { getItemCategory, getItemColour, getItemModel } = React.useContext(ItemContext);
    // useNavigate is a hook which gives access to navigation object
    const navigate = useNavigate();

    return (
        <div className='cart-table'>
            <div className='table-container'>
                <div className='table-list'>
                    {items.map((item, index) => (
                        <div className='table-card' key={index}>
                            <Close
                                color={hover ? 'error' : 'primary'}
                                onClick={() => navigate(-1)}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                style={{
                                    cursor: 'pointer',
                                    left: '0.5%',
                                    position: 'absolute',
                                    top: '0.5%'
                                }}
                            />
                            <div className='table-card-image'>
                                <ItemImage
                                    item={item}
                                    optionalText={`código del artículo: ${item.id}`}
                                />
                                <div className='price-per-item'>
                                    <p className='grey-header'>{`precio:`}</p>
                                    <p className='navy-header' style={{ fontWeight: '500', textTransform: 'uppercase' }}>
                                        {`${currency} ${item.priceUsd}`}
                                    </p>
                                </div>
                            </div>
                            <div className='table-card-info'>
                                <div className='mt-4 flex justify-between'>
                                    <Link to={`/product/${item.id}`} aria-label='item-id'>
                                        <h2 className='brand'>{item.brand}</h2>
                                        {getItemModel(item, { whiteSpace: 'wrap' })}
                                    </Link>
                                    <Spacer value={2} />
                                    <div style={{ padding: '0', textAlign: 'center' }}>
                                        {getItemCategory(item)}{getItemColour(item)}
                                    </div>
                                    <Spacer value={1.5} />
                                    <p className='grey-header'>{`subtotal:`}</p>
                                    <p className='sub-total-price'>{`${currency} ${handleSubTotalPrice(item)}`}</p>
                                    <Spacer value={5} />
                                    <Counter
                                        addItem={() => handleIncreaseItem(item.id)}
                                        removeItem={() => handleDecreaseItem(item.id)}
                                        quantity={item.quantity}
                                    />
                                </div>
                            </div>
                        </div>))
                    }
                </div>
                <div className='order-buttons'>
                    <TotalPrice totalPrice={handleTotalPrice()} />
                    <CartOrder />
                </div>
            </div>
        </div>
    );
}

CartTable.propTypes = {
    currency: PropTypes.string,
    items: PropTypes.array
}

export default CartTable;