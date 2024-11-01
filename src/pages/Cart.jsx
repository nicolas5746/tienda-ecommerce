import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '@/contexts/Contexts';
import { Button } from '@ui/Buttons';
import { AddToCartIcon } from '@ui/Icons';
import { scrollToTop } from '@/utils/utils';
import CartTable from '@/components/cart/CartTable';

const Cart = () => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { cartSize, toggleShowCart } = React.useContext(CartContext);
    // Show cart table
    React.useEffect(() => {
        (cartSize >= 1) ? (toggleShowCart(true), scrollToTop()) : toggleShowCart(false);
    }, [cartSize, toggleShowCart]);

    return (
        <section className='pb-[10%]'>
            {cartSize < 1 ?
                <>
                    <div className='flex flex-col items-center justify-center text-center text-5lg text-ferrari font-semibold font-lato pb-[5%] pt-[25%] 3md:pt-[15%]'>
                        <AddToCartIcon badgeColor='error' cartColor='primary' iconButtonColor='primary' iconButtonStyle={{ pointerEvents: 'none' }} quantity={cartSize.toString()} />
                        <span className='first-letter:uppercase'>tu carrito está vacío!</span>
                    </div>
                    <Link className='flex items-center justify-center' to='/' aria-label='home'>
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
                <CartTable />}
        </section>
    );
}

export default Cart;