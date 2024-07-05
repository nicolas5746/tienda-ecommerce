import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, ItemContext, OrderContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import { AddToCartIcon } from '@ui/icons/Icons';
import { closeOnEvent, scrollToTop } from '@utils/utils';
import CartTable from '@components/cart/cartTable/CartTable';
import './cart.sass';

const Cart = () => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { cartSize, handleUpdateStock, purchaseIsFinished, showCart, toggleShowCart } = React.useContext(CartContext);
    const { getItems } = React.useContext(ItemContext);
    const { handleClearOrderId, success } = React.useContext(OrderContext);
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
    // Update items after purchase
    React.useEffect(() => {
        (cartSize >= 1) ? (toggleShowCart(true), scrollToTop()) : toggleShowCart(false);
        (success) ? (getItems(), handleUpdateStock()) : handleClearOrderId();
    }, [cartSize, getItems, handleClearOrderId, handleUpdateStock, success, toggleShowCart]);
    
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
        <div className='cart'>
            {cartSize < 1
                ?
                <>
                    <div className='no-item'>
                        <AddToCartIcon badgeColor='error' cartColor='primary' iconButtonColor='primary' iconButtonStyle={{ pointerEvents: 'none' }} quantity={cartSize.toString()} />
                        <span>tu carrito está vacío!</span>
                    </div>
                    <Link to='/' aria-label='home'>
                        <Button
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            style={{
                                color: hover ? '#357ec7' : '#dcdcdc',
                                backgroundColor: hover ? '#dcdcdc' : '#357ec7',
                                border: hover ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                borderRadius: '0.5em',
                                padding: '0.5%',
                                width: '20%'
                            }}
                            text='continuar comprando'
                            title='Continuar comprando'
                        />
                    </Link>
                </>
                :
                <CartTable tableRef={cartTableRef} />
            }
        </div>
    );
}

export default Cart;