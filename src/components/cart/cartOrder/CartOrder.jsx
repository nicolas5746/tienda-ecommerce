import React from 'react';
import { CartContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import { closeOnEvent } from '@utils/utils';
import CartForm from '@components/cart/cartForm/CartForm';
import './cartOrder.sass';

const CartOrder = () => {
    // States
    const [hover1, setHover1] = React.useState(false);
    const [hover2, setHover2] = React.useState(false);
    // Reference value
    const cartFormRef = React.useRef(null);
    // Context
    const { handleClearCart, purchaseIsFinished, showForm, toggleCartForm } = React.useContext(CartContext);
    // Callback to close Cart Form when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, !purchaseIsFinished, cartFormRef, () => toggleCartForm(false));
    }, [purchaseIsFinished, toggleCartForm]);
    // Events to close Cart Form
    React.useEffect(() => {
        if (showForm) setHover1(false);
        document.addEventListener('click', handleCloseOnEvent, true);
        document.addEventListener('keydown', handleCloseOnEvent, true);
        return () => {
            document.removeEventListener('click', handleCloseOnEvent, true);
            document.removeEventListener('keydown', handleCloseOnEvent, true);
        }
    }, [handleCloseOnEvent, showForm]);

    return (
        <>
            {showForm
                ?
                <CartForm formRef={cartFormRef} />
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