import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, ItemContext, OrderContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import { Close } from '@ui/icons/Icons';
import { closeOnEvent, copyOnClick } from '@utils/utils';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Dots from '@ui/dots/Dots';
import './checkout.sass';

const Checkout = () => {
    // States
    const [hover1, setHover1] = React.useState(false);
    const [hover2, setHover2] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);
    // Context
    const { handleResetCart, handleUpdateStock, purchaseIsFinished } = React.useContext(CartContext);
    const { getItems } = React.useContext(ItemContext);
    const { orderId, success } = React.useContext(OrderContext);
    // Reference value
    const checkoutRef = React.useRef(null);
    // Access to navigation object
    const navigate = useNavigate();
    // Callback to close Checkout
    const handleCloseCheckout = React.useCallback(() => {
        handleResetCart();
        navigate('/');
    }, [handleResetCart, navigate]);
    // Callback to close Checkout when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, purchaseIsFinished, checkoutRef, handleCloseCheckout);
    }, [handleCloseCheckout, purchaseIsFinished]);
    // Close Checkout and reset Cart
    React.useEffect(() => {
        document.addEventListener('click', handleCloseOnEvent, true);
        document.addEventListener('keydown', handleCloseOnEvent, true);
        window.addEventListener('beforeunload', handleCloseCheckout);
        return () => {
            document.removeEventListener('click', handleCloseOnEvent, true);
            document.removeEventListener('keydown', handleCloseOnEvent, true);
            window.removeEventListener('beforeunload', handleCloseCheckout);
        }
    }, [handleCloseCheckout, handleCloseOnEvent]);
    // Update items after purchase
    React.useEffect(() => {
        if (success) {
            handleUpdateStock();
            getItems();
        }
    }, [getItems, handleUpdateStock, success]);

    return (
        <div className='cart-form'>
            <div className='checkout' ref={checkoutRef}>
                <Close
                    color={hover1 ? 'error' : 'primary'}
                    onClick={handleCloseCheckout}
                    onMouseEnter={() => setHover1(true)}
                    onMouseLeave={() => setHover1(false)}
                    style={{ cursor: 'pointer', left: '0.5%', position: 'absolute', top: '0.5%' }}
                />
                <div className='checkout-message'>
                    {success
                        ?
                        <>
                            <img alt='Tienda Americana' src='https://i.postimg.cc/Jh4Q7W6r/logo.png' title='Tienda Americana' />
                            <h1>gracias por tu compra!</h1>
                            <p>tu número de pedido es: {orderId}
                                <ContentCopyOutlinedIcon className='copy-icon' onClick={() => copyOnClick(orderId, setIsCopied)} />
                                {isCopied ? <span className='copied'>copiado!</span> : <span className='copy' >copiar</span>}
                            </p>
                            <Button
                                onClick={handleCloseCheckout}
                                onMouseEnter={() => setHover2(true)}
                                onMouseLeave={() => setHover2(false)}
                                style={{
                                    color: hover2 ? '#357ec7' : '#dcdcdc',
                                    backgroundColor: hover2 ? '#dcdcdc' : '#357ec7',
                                    border: hover2 ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                    borderRadius: '0.5em',
                                    marginTop: '5vh',
                                    padding: '2%',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap'
                                }}
                                text='ir al inicio'
                                title='Ir al inicio'
                            />
                        </>
                        :
                        <Dots />
                    }
                </div>
            </div>
        </div>
    );
}

export default Checkout;