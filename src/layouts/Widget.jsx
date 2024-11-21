import React from 'react';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { CartContext } from '@/contexts/Contexts';
import { CartIcon } from '@ui/Icons';

const Widget = () => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { cartSize } = React.useContext(CartContext);

    return (
        <div className='block bg-transparent p-[5%]' title='MI CARRITO'>
            <Link to='../cart' aria-label='cart'>
                {cartSize < 1 ?
                    <CartIcon onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ color: hover ? '#357ec7' : '#dcdcdc' }} />
                    :
                    <Badge color='error' badgeContent={cartSize.toString()}>
                        <CartIcon onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ color: hover ? '#357ec7' : '#f5f5f5' }} />
                    </Badge>}
            </Link>
        </div>
    );
}

export default Widget;