import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import { AddToCartIcon } from '@ui/icons/Icons';
import { scrollToTop } from '@utils/utils';
import CartTable from '@components/cart/cartTable/CartTable';
import './cart.sass';

const Cart = () => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { cartSize, toggleShowCart } = React.useContext(CartContext);
    // Show Cart Table
    React.useEffect(() => {
        (cartSize >= 1) ? (toggleShowCart(true), scrollToTop()) : toggleShowCart(false);
    }, [cartSize, toggleShowCart]);

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
                <CartTable />
            }
        </div>
    );
}

export default Cart;