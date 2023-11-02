import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { CartContext, OrderContext } from '@contexts/contexts';
import { Button } from '@ui/buttons/Buttons';
import { SubmitButton } from '@ui/buttons/Buttons';
import { Close } from '@ui/icons/Icons';
import { FormInputs } from '@ui/inputs/Inputs';
import Checkout from '@components/cart/checkout/Checkout';
import TotalPrice from '@ui/totalPrice/TotalPrice';
import './cartForm.sass';

const CartForm = ({ closeForm }) => {
    // Hooks
    const [check, setCheck] = React.useState(false);
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
    const { handleResetCart, handleTotalPrice, handleAddedItems } = React.useContext(CartContext);
    const { handleSendOrder, orderId, setOrderId } = React.useContext(OrderContext);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setForm((data) => {
            return { ...data, [name]: value }
        });
    }
    // Function on submitting order form
    const handleOnSubmit = (event) => {
        event.preventDefault();
        setCheck(true);
        handleSendOrder(form, handleAddedItems(), handleTotalPrice());
    }
    // Function to reset cart
    const handleOnReset = () => {
        handleResetCart();
        setOrderId([]);
        setCheck(false);
    }

    return (
        <div className='cartForm'>
            <div className='cartFormContainer'>
                {check
                    ?
                    <Checkout
                        orderId={orderId}
                        resetCart={() => handleOnReset()}
                    />
                    :
                    <>
                        <Close
                            color={hover1 ? 'error' : 'primary'}
                            onClick={closeForm}
                            onMouseEnter={() => setHover1(true)}
                            onMouseLeave={() => setHover1(false)}
                            style={{
                                cursor: 'pointer',
                                left: '0.5%',
                                position: 'absolute',
                                top: '0.5%'
                            }}
                        />
                        <div className='formContainer'>
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
                                    <div className='formButtons'>
                                        <SubmitButton
                                            onMouseEnter={() => setHover2(true)}
                                            onMouseLeave={() => setHover2(false)}
                                            style={{
                                                color: hover2 ? '#357ec7' : '#dcdcdc',
                                                backgroundColor: hover2 ? '#dcdcdc' : '#357ec7',
                                                border: hover2 ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                                borderRadius: '0.5em',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                margin: '5%',
                                                padding: '5%',
                                                width: '100%',
                                                whiteSpace: 'nowrap'
                                            }}
                                            text={'enviar'}
                                            title={'Enviar'}
                                        />
                                        <Button
                                            onClick={closeForm}
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
                                            text={'cancelar'}
                                            title={'Cancelar'}
                                        />
                                    </div>
                                </form>
                            </Box>
                            <TotalPrice
                                totalPrice={handleTotalPrice()}
                                style={{ marginTop: '18%' }}
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

CartForm.propTypes = {
    closeForm: PropTypes.func
}

export default CartForm;