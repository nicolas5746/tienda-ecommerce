import React from 'react';
import { CartContext } from '@contexts/Contexts';
import { Button } from '@ui/buttons/Buttons';
import CartForm from '@components/cart/cartForm/CartForm';
import './cartOrder.sass';

const CartOrder = () => {
    // Hooks
    const [hover1, setHover1] = React.useState(false);
    const [hover2, setHover2] = React.useState(false);
    const [showForm, setShowForm] = React.useState(false);
    // Context
    const { handleClearCart } = React.useContext(CartContext);
    // Function to close Form    
    const handleCloseForm = () => {
        setHover1(false);
        setShowForm(!showForm);
    }

    return (
        <>
            {showForm
                ?
                <CartForm closeForm={() => handleCloseForm()} />
                :
                <div className='cartOrder'>
                    <Button
                        onClick={() => setShowForm(!showForm)}
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
                        text={`confirmar compra`}
                    />
                    <Button
                        onClick={() => handleClearCart()}
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
                        text={`vaciar carrito`}
                    />
                </div>
            }
        </>
    );
}

export default CartOrder;