import React from 'react';
import { CartContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import CartForm from '@components/cart/cartForm/CartForm';
import './cartOrder.sass';

const CartOrder = () => {
    // States
    const [hover1, setHover1] = React.useState(false);
    const [hover2, setHover2] = React.useState(false);
    // Context
    const { handleClearCart, showForm, toggleCartForm } = React.useContext(CartContext);
    // Reset button hover
    React.useEffect(() => {
        if (showForm) setHover1(false);
    }, [showForm]);

    return (
        <>
            {showForm
                ?
                <CartForm />
                :
                <div className='cart-order'>
                    <Button
                        onClick={() => toggleCartForm(true)}
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        style={{
                            color: hover1 ? '#357ec7' : '#dcdcdc',
                            backgroundColor: hover1 ? '#dcdcdc' : '#357ec7',
                            border: '0.1em solid #357ec7',
                            borderRadius: '0.5em',
                            padding: '2%',
                            width: '105%',
                            whiteSpace: 'nowrap'
                        }}
                        text='continuar compra'
                        title='Continuar compra'
                    />
                    <Button
                        onClick={handleClearCart}
                        onMouseEnter={() => setHover2(true)}
                        onMouseLeave={() => setHover2(false)}
                        style={{
                            color: hover2 ? '#357ec7' : '#dcdcdc',
                            backgroundColor: hover2 ? '#dcdcdc' : '#357ec7',
                            border: '0.1em solid #357ec7',
                            borderRadius: '0.5em',
                            padding: '2%',
                            width: '105%',
                            whiteSpace: 'nowrap'
                        }}
                        text='vaciar carrito'
                        title='Vaciar carrito'
                    />
                </div>
            }
        </>
    );
}

export default CartOrder;