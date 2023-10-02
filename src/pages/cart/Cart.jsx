import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@contexts/Contexts';
import { Button } from '@ui/buttons/Buttons';
import { AddToCartIcon } from '@ui/icons/Icons';
import CartTable from '@components/cart/cartTable/CartTable';
import scrollToTop from '@utils/scrollToTop';
import './cart.sass';

const Cart = () => {
    // Hooks
    const [hover, setHover] = React.useState(false);
    // Context
    const { cart, cartSize } = React.useContext(CartContext);
    
    return (
        <div className='cart'>
            {scrollToTop()}
            {cartSize < 1
                ?
                <>
                    <div className='noItem'>
                        <AddToCartIcon
                            badgeColor={'error'}
                            cartColor={'primary'}
                            iconButtonColor={'primary'}
                            iconButtonStyle={{ pointerEvents: 'none' }}
                            quantity={cartSize.toString()}
                        />
                        <span>{`tu carrito está vacío!`}</span>
                    </div>
                    <Link to={'/'} aria-label='home'>
                        <Button
                            text={`continuar comprando`}
                            style={{
                                color: hover ? '#357ec7' : '#dcdcdc',
                                backgroundColor: hover ? '#dcdcdc' : '#357ec7',
                                border: hover ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                borderRadius: '0.5em',
                                padding: '0.5%',
                                width: '20%'
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        />
                    </Link>
                </>
                :
                <CartTable items={cart} currency={`usd`} />
            }
        </div>
    );
}

export default Cart;