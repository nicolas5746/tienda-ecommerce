import React from 'react';
import { CartContext } from '@/contexts/Contexts';
import { Button } from '@ui/Buttons';
import CartForm from './CartForm';

const CartOrder = () => {
    // States
    const [hover, setHover] = React.useState({});
    // Context
    const { handleResetCart, handleUpdateCart, handleNotification, showForm, toggleCartForm } = React.useContext(CartContext);
    // Reset button hover event
    React.useEffect(() => {
        if (showForm) setHover({ continue: false });
    }, [showForm]);

    return (
        <>
            {showForm ?
                <CartForm />
                :
                <div className='relative flex flex-col items-center justify-center w-full scale-90 lg:scale-100'>
                    <Button
                        onClick={() => toggleCartForm(true)}
                        onMouseEnter={() => setHover({ continue: true })}
                        onMouseLeave={() => setHover({ continue: false })}
                        style={{
                            color: hover.continue ? '#357ec7' : '#dcdcdc',
                            backgroundColor: hover.continue ? '#dcdcdc' : '#357ec7',
                            border: '0.1em solid #357ec7',
                            borderRadius: '0.5em',
                            margin: '2.5%',
                            padding: '2%',
                            width: '105%',
                            whiteSpace: 'nowrap'
                        }}
                        text='continuar compra'
                        title='Continuar compra'
                    />
                    <Button
                        onClick={() => handleNotification({ accept: handleResetCart, decline: handleUpdateCart, declinable: true, show: true }, '¿Deseas vaciar tu carrito?')}
                        onMouseEnter={() => setHover({ empty: true })}
                        onMouseLeave={() => setHover({ empty: false })}
                        style={{
                            color: hover.empty ? '#357ec7' : '#dcdcdc',
                            backgroundColor: hover.empty ? '#dcdcdc' : '#357ec7',
                            border: '0.1em solid #357ec7',
                            borderRadius: '0.5em',
                            margin: '2.5%',
                            padding: '2%',
                            width: '105%',
                            whiteSpace: 'nowrap'
                        }}
                        text='vaciar carrito'
                        title='Vaciar carrito'
                    />
                </div>}
        </>
    );
}

export default CartOrder;