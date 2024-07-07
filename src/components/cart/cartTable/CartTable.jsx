import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, ItemContext } from '@contexts/contexts';
import { Close } from '@ui/icons/Icons';
import { closeOnEvent } from '@utils/utils';
import CartOrder from '@components/cart/cartOrder/CartOrder';
import ItemImage from '@components/product/itemImage/ItemImage';
import Counter from '@ui/counter/Counter';
import Spacer from '@ui/spacer/Spacer';
import TotalPrice from '@ui/totalPrice/TotalPrice';
import './cartTable.sass';

const CartTable = () => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { cart, handleSubTotalPrice, handleTotalPrice, handleIncreaseItem, handleDecreaseItem, purchaseIsFinished, showCart, toggleShowCart } = React.useContext(CartContext);
    const { getItemCategory, getItemColour, getItemModel } = React.useContext(ItemContext);
    // Reference value
    const cartTableRef = React.useRef(null);
    // Access to navigation object
    const navigate = useNavigate();
    // Function to close Cart and return to previous page
    const handleCloseCart = React.useCallback(() => {
        toggleShowCart(false);
        navigate(-1);
    }, [navigate, toggleShowCart]);
    // Callback to close Cart when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, !purchaseIsFinished, cartTableRef, handleCloseCart);
    }, [handleCloseCart, purchaseIsFinished]);
    // Apply events to close Cart
    React.useEffect(() => {
        if (showCart) {
            document.addEventListener('click', handleCloseOnEvent, true);
            document.addEventListener('keydown', handleCloseOnEvent, true);
        }
        return () => {
            document.removeEventListener('click', handleCloseOnEvent, true);
            document.removeEventListener('keydown', handleCloseOnEvent, true);
        }
    }, [handleCloseOnEvent, showCart]);

    return (
        <div className='cart-table'>
            {showCart &&
                <div className='table-container' ref={cartTableRef}>
                    <div className='table-list'>
                        {cart.map((item) => (
                            <div className='table-card' key={item.id}>
                                <Close
                                    color={hover ? 'error' : 'primary'}
                                    onClick={handleCloseCart}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    style={{ cursor: 'pointer', left: '0.5%', position: 'absolute', top: '0.5%' }}
                                />
                                <div className='table-card-image'>
                                    <ItemImage item={item} optionalText={`código del artículo: ${item.id}`} />
                                    <div className='price-per-item'>
                                        <p className='grey-header'>precio:</p>
                                        <p className='navy-header' style={{ fontWeight: '500', textTransform: 'uppercase' }}>usd&nbsp;{item.priceUsd}</p>
                                    </div>
                                </div>
                                <div className='table-card-info'>
                                    <div className='mt-4 flex justify-between'>
                                        <Link to={`/product/${item.id}`} aria-label='item-id'>
                                            <h2 className='brand'>{item.brand}</h2>
                                            {getItemModel(item, { whiteSpace: 'wrap' })}
                                        </Link>
                                        <Spacer value={2} />
                                        <div style={{ padding: '0', textAlign: 'center' }}>{getItemCategory(item)}{getItemColour(item)}</div>
                                        <Spacer value={1.5} />
                                        <p className='grey-header'>subtotal:</p>
                                        <p className='sub-total-price'>usd&nbsp;{handleSubTotalPrice(item)}</p>
                                        <Spacer value={5} />
                                        <Counter addItem={() => handleIncreaseItem(item.id)} removeItem={() => handleDecreaseItem(item.id)} quantity={item.quantity} />
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
            }
        </div>
    );
}

export default CartTable;