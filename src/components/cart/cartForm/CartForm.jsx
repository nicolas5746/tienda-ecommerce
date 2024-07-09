import React from 'react';
import Box from '@mui/material/Box';
import { CartContext, OrderContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import { SubmitButton } from '@ui/buttons/Buttons';
import { Close } from '@ui/icons/Icons';
import { FormInputs } from '@ui/inputs/Inputs';
import { closeOnEvent } from '@utils/utils';
import Checkout from '@components/cart/checkout/Checkout';
import TotalPrice from '@ui/totalPrice/TotalPrice';
import './cartForm.sass';

const CartForm = () => {
    // States
    const [completeData, setCompleteData] = React.useState(false);
    const [hover1, setHover1] = React.useState(false);
    const [hover2, setHover2] = React.useState(false);
    const [hover3, setHover3] = React.useState(false);
    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
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
    // Function on submitting order form
    const handleOnSubmit = (event) => {
        event.preventDefault();
        handleSendOrder(form, handleAddedItems, handleTotalPrice);
        toggleCheckout(true);
    }
    // Callback to close Cart Form when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, !purchaseIsFinished, cartFormRef, () => toggleCartForm(false));
    }, [purchaseIsFinished, toggleCartForm]);
    // Email and phone pattern
    React.useEffect(() => {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phonePattern = /\d/g;
        (form.phone.match(phonePattern) && form.email.match(emailPattern)) ? setCompleteData(true) : setCompleteData(false);
    }, [form.email, form.phone]);
    // // Apply events to close Cart Form
    React.useEffect(() => {
        document.addEventListener('click', handleCloseOnEvent, true);
        document.addEventListener('keydown', handleCloseOnEvent, true);
        return () => {
            document.removeEventListener('click', handleCloseOnEvent, true);
            document.removeEventListener('keydown', handleCloseOnEvent, true);
        }
    }, [handleCloseOnEvent]);

    return (
        <div className='cart-form'>
            <div className='cart-form-container' ref={cartFormRef}>
                {purchaseIsFinished
                    ?
                    <Checkout />
                    :
                    <>
                        <Close
                            color={hover1 ? 'error' : 'primary'}
                            onClick={() => toggleCartForm(false)}
                            onMouseEnter={() => setHover1(true)}
                            onMouseLeave={() => setHover1(false)}
                            style={{ cursor: 'pointer', left: '0.5%', position: 'absolute', top: '0.5%' }}
                        />
                        <div className='form-container'>
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
                                <form className='form' onSubmit={handleOnSubmit}>
                                    <FormInputs
                                        emailValue={form.email}
                                        firstNameValue={form.firstName}
                                        lastNameValue={form.lastName}
                                        onChange={handleOnChange}
                                        phoneValue={form.phone}
                                    />
                                    <div className='form-buttons'>
                                        <SubmitButton
                                            disabled={completeData ? false : true}
                                            onMouseEnter={() => setHover2(true)}
                                            onMouseLeave={() => setHover2(false)}
                                            style={{
                                                color: hover2 ? '#357ec7' : '#dcdcdc',
                                                backgroundColor: !completeData ? '#67686a' : hover2 ? '#dcdcdc' : '#357ec7',
                                                border: hover2 ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
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
                                            onMouseEnter={() => setHover3(true)}
                                            onMouseLeave={() => setHover3(false)}
                                            style={{
                                                color: hover3 ? '#357ec7' : '#dcdcdc',
                                                backgroundColor: hover3 ? '#dcdcdc' : '#357ec7',
                                                border: hover3 ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
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
                            <TotalPrice totalPrice={handleTotalPrice()} style={{ marginTop: '18%' }} />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default CartForm;