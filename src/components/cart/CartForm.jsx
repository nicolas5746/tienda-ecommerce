import React from 'react';
import Box from '@mui/material/Box';
import { CartContext, OrderContext } from '@/contexts/Contexts';
import { Button } from '@ui/Buttons';
import { SubmitButton } from '@ui/Buttons';
import { Close } from '@ui/Icons';
import { FormInputs } from '@ui/Inputs';
import { closeOnEvent } from '@/utils/utils';
import Checkout from './Checkout';

const CartForm = () => {
    // States
    const [completeData, setCompleteData] = React.useState(false);
    const [hover, setHover] = React.useState({});
    const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '', phone: '' });
    // Context
    const { handleAddedItems, handleTotalPrice, purchaseIsFinished, toggleCheckout, toggleCartForm } = React.useContext(CartContext);
    const { handleSendOrder } = React.useContext(OrderContext);
    // Reference value
    const cartFormRef = React.useRef(null);
    // Set values on change input
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setForm((data) => {
            return { ...data, [name]: value }
        });
    }
    // Submitting order form
    const handleOnSubmit = (event) => {
        event.preventDefault();
        handleSendOrder(form, handleAddedItems, handleTotalPrice);
        toggleCheckout(true);
    }
    // Close cart form when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, !purchaseIsFinished, cartFormRef, () => toggleCartForm(false));
    }, [purchaseIsFinished, toggleCartForm]);
    // Email and phone pattern
    React.useEffect(() => {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phonePattern = /\d/g;
        (form.phone.match(phonePattern) && form.email.match(emailPattern)) ? setCompleteData(true) : setCompleteData(false);
    }, [form.email, form.phone]);
    // Apply events to close cart form
    React.useEffect(() => {
        document.addEventListener('click', handleCloseOnEvent, true);
        document.addEventListener('keydown', handleCloseOnEvent, true);
        return () => {
            document.removeEventListener('click', handleCloseOnEvent, true);
            document.removeEventListener('keydown', handleCloseOnEvent, true);
        }
    }, [handleCloseOnEvent]);

    return (
        <div className='fixed bg-transparent-dark-grey inset-0 h-full w-full' style={{ zIndex: '2' }}>
            <div
                className='relative flex flex-row justify-around bg-gainsboro h-5/6 w-[94%] rounded-lg'
                ref={cartFormRef}
                style={{ margin: '3vh auto', zIndex: '3' }}
            >
                {purchaseIsFinished ?
                    <Checkout />
                    :
                    <>
                        <Close
                            color={hover.close ? 'error' : 'primary'}
                            onClick={() => toggleCartForm(false)}
                            onMouseEnter={() => setHover({ close: true })}
                            onMouseLeave={() => setHover({ close: false })}
                            style={{ cursor: 'pointer', left: '0.5%', position: 'absolute', top: '0.5%' }}
                        />
                        <div className='relative flex flex-row items-center justify-center w-4/5 m-[0.5% 5%]'>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    py: 2,
                                    width: '100%'
                                }}
                            >
                                <form className='flex flex-col items-center justify-center w-full' onSubmit={handleOnSubmit}>
                                    <FormInputs
                                        emailValue={form.email}
                                        firstNameValue={form.firstName}
                                        lastNameValue={form.lastName}
                                        onChange={handleOnChange}
                                        phoneValue={form.phone}
                                    />
                                    <div className='relative flex flex-row items-center justify-center m-[1% auto] whitespace-nowrap'>
                                        <SubmitButton
                                            disabled={completeData ? false : true}
                                            onMouseEnter={() => setHover({ submit: true })}
                                            onMouseLeave={() => setHover({ submit: false })}
                                            style={{
                                                color: hover.submit ? '#357ec7' : '#dcdcdc',
                                                backgroundColor: !completeData ? '#67686a' : hover.submit ? '#dcdcdc' : '#357ec7',
                                                border: hover.submit ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                                borderRadius: '0.5em',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                margin: '5%',
                                                padding: '5%',
                                                width: '100%',
                                                whiteSpace: 'nowrap'
                                            }}
                                            text='Enviar'
                                            title='Enviar'
                                        />
                                        <Button
                                            onClick={() => toggleCartForm(false)}
                                            onMouseEnter={() => setHover({ cancel: true })}
                                            onMouseLeave={() => setHover({ cancel: false })}
                                            style={{
                                                color: hover.cancel ? '#357ec7' : '#dcdcdc',
                                                backgroundColor: hover.cancel ? '#dcdcdc' : '#357ec7',
                                                border: hover.cancel ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                                borderRadius: '0.5em',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                margin: '5%',
                                                padding: '6%',
                                                textAlign: 'center',
                                                textTransform: 'uppercase',
                                                width: '100%'
                                            }}
                                            text='cancelar'
                                            title='Cancelar'
                                        />
                                    </div>
                                </form>
                            </Box>
                        </div>
                    </>}
            </div>
        </div>
    );
}

export default CartForm;