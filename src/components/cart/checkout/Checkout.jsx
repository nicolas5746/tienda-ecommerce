import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@ui/buttons/Buttons';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Dots from '@ui/dots/Dots';
import copyOnClick from '@utils/copyOnClick';
import './checkout.sass';

const Checkout = ({ orderId, resetCart }) => {
    // Hooks
    const [hover, setHover] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);
    // Path to logo img
    let logo = `https://i.postimg.cc/Jh4Q7W6r/logo.png`;

    return (
        <div className='cartForm'>
            <div className='checkout'>
                <div className='checkoutMessage'>
                    <img
                        alt={'Tienda Americana'}
                        src={logo}
                        title={'Tienda Americana'}
                    />
                    <h1>{`gracias por tu compra!`}</h1>
                    {orderId.length > 0
                        ?
                        <>
                            <p>
                                {`tu número de pedido es: ${orderId}`}
                                <ContentCopyOutlinedIcon
                                    className='copyIcon'
                                    onClick={() => copyOnClick(orderId, setIsCopied)}
                                />
                                {isCopied
                                    ?
                                    <span className='copied'>{`copiado!`}</span>
                                    :
                                    <span className='copy' >{`copiar`}</span>
                                }
                            </p>
                            <Link to={'/'} aria-label='home'>
                                <Button
                                    onClick={resetCart}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    style={{
                                        color: hover ? '#357ec7' : '#dcdcdc',
                                        backgroundColor: hover ? '#dcdcdc' : '#357ec7',
                                        border: hover ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                                        borderRadius: '0.5em',
                                        marginTop: '5vh',
                                        padding: '5%',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        width: '120%',
                                        whiteSpace: 'nowrap'
                                    }}
                                    text={'ir al inicio'}
                                    title={'Ir al inicio'}
                                />
                            </Link>
                        </>
                        :
                        <Dots />
                    }
                </div>
            </div>
        </div>
    );
}

Checkout.propTypes = {
    orderId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    resetCart: PropTypes.func
}

export default Checkout;