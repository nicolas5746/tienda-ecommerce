import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, ItemContext, OrderContext } from '@/contexts/Contexts';
import { Button } from '@ui/Buttons';
import { Close } from '@ui/Icons';
import { copyOnClick } from '@/utils/utils';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Dots from '@/layouts/Dots';

const Checkout = () => {
    // States
    const [hover, setHover] = React.useState({});
    const [isCopied, setIsCopied] = React.useState(false);
    // Context
    const { handleResetCart, handleUpdateStock } = React.useContext(CartContext);
    const { getItems } = React.useContext(ItemContext);
    const { failedOrder, failureMessage, orderId, sucessfulOrder } = React.useContext(OrderContext);
    // Reference value
    const checkoutRef = React.useRef(null);
    // Access to navigation object
    const navigate = useNavigate();
    // Tailwind classes
    const copyClass = 'absolute text-center text-5xs text-azure first-letter:uppercase font-roboto bg-transparent-black ml-[0.5%] p-[1.5%] rounded-sm border border-solid border-grey whitespace-nowrap';
    const copyStyle = { visibility: hover.copy ? 'visible' : 'hidden' };
    const headerClass = 'first-letter:uppercase text-xl text-windows-blue font-semibold font-lato';
    const paragraphClass = 'first-letter:uppercase text-2lg text-red font-medium font-lato';
    // Close checkout
    const handleCloseCheckout = React.useCallback(() => {
        handleResetCart();
        navigate('/');
    }, [handleResetCart, navigate]);
    // Update items after purchase
    React.useEffect(() => {
        if (sucessfulOrder) {
            handleUpdateStock();
            getItems();
        }
    }, [getItems, handleUpdateStock, sucessfulOrder]);
    // Close checkout and reset cart
    React.useEffect(() => {
        if (sucessfulOrder) {
            window.addEventListener('beforeunload', handleCloseCheckout);
            return () => window.removeEventListener('beforeunload', handleCloseCheckout);
        }
    }, [handleCloseCheckout, sucessfulOrder]);

    return (
        <div className='fixed bg-transparent-dark-grey h-full w-full inset-0' style={{ zIndex: '2' }}>
            <div
                className='relative flex flex-row items-center justify-center bg-gainsboro h-[85%] w-[95%] rounded-md'
                style={{ margin: '2vh auto', zIndex: '3' }}
                ref={checkoutRef}
            >
                <Close
                    onClick={handleCloseCheckout}
                    onMouseEnter={() => setHover({ close: true })}
                    onMouseLeave={() => setHover({ close: false })}
                    style={{ cursor: 'pointer', left: '0.5%', position: 'absolute', top: '0.5%' }}
                    color={hover.close ? 'error' : 'primary'}
                />
                <div className='relative flex flex-col items-center justify-center text-center m-[0 auto] p-[1%]'>
                    {sucessfulOrder ?
                        <>
                            <img
                                alt='Tienda Americana'
                                className='h-[18vh] w-[30vw] mb-[5%]'
                                src='https://res.cloudinary.com/dmnyy2q99/image/upload/v1729533634/title_cprjlh.png'
                                title='Tienda Americana'
                            />
                            <h1 className={headerClass}>gracias por tu compra!</h1>
                            <p className={paragraphClass}>tu número de pedido es: {orderId}
                                <ContentCopyOutlinedIcon
                                    className='copy-icon text-steelblue hover:text-neon-red p-[1.2% 0.5%] hover:cursor-pointer'
                                    onMouseEnter={() => setHover({ copy: true })}
                                    onMouseLeave={() => setHover({ copy: false })}
                                    onClick={() => copyOnClick(orderId, setIsCopied)}
                                />
                                {isCopied ?
                                    <span className={copyClass} style={copyStyle}>copiado!</span>
                                    :
                                    <span className={copyClass} style={copyStyle}>copiar</span>}
                            </p>
                            <Button
                                onClick={handleCloseCheckout}
                                onMouseEnter={() => setHover({ button: true })}
                                onMouseLeave={() => setHover({ button: false })}
                                style={{
                                    color: hover.button ? '#357ec7' : '#dcdcdc',
                                    backgroundColor: hover.button ? '#dcdcdc' : '#357ec7',
                                    border: hover.button ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
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
                        failedOrder
                            ?
                            <>
                                <h1 className={headerClass}>Algo salió mal:</h1>
                                <p className={paragraphClass}>{failureMessage}</p>
                            </>
                            :
                            <Dots />}
                </div>
            </div>
        </div>
    );
}

export default Checkout;