import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartContext } from '@/contexts/Contexts';
import { Button } from '@ui/Buttons';
import { CheckedIcon } from '@ui/Icons';

const IsInCart = ({ id, onClick }) => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { handleIsInCart } = React.useContext(CartContext);

    return (
        <div className='relative flex flex-col uppercase bottom-0 whitespace-nowrap'>
            {handleIsInCart(id) ?
                <>
                    <CheckedIcon color='success' fontSize='medium' style={{ display: 'block', margin: '5% 0 0 35%' }} title='Agregado' />
                    <Link to='/cart' aria-label='cart'>
                        <Button
                            style={{
                                color: '#357ec7',
                                backgroundColor: hover ? '#f0ffff' : '#dcdcdc',
                                border: '0.1em solid #357ec7',
                                borderRadius: '0.5em',
                                display: 'block',
                                margin: '5% 0 0 -10%',
                                padding: '3%',
                                width: '120%'
                            }}
                            text='ir al carrito'
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            title='IR AL CARRITO'
                        />
                    </Link>
                </>
                :
                <Button
                    style={{
                        color: hover ? '#357ec7' : '#dcdcdc',
                        backgroundColor: hover ? '#dcdcdc' : '#357ec7',
                        border: hover ? '0.1em solid #357ec7' : '0.1em solid #dcdcdc',
                        borderRadius: '0.5em',
                        display: 'block',
                        margin: '22% 0 0 -10%',
                        padding: '3%',
                        width: '120%'
                    }}
                    text='agregar al carrito'
                    onClick={onClick}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    title='AGREGAR AL CARRITO'
                />}
        </div>
    );
}

IsInCart.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func
}

export default IsInCart;