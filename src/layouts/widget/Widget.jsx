import React from 'react';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { CartContext } from '@contexts/contexts';
import { CartIcon } from '@ui/icons/Icons';
import './widget.sass';

const Widget = () => {
    // States
    const [hover, setHover] = React.useState(false);
    // Context
    const { cartSize } = React.useContext(CartContext);

    return (
        <div className='widget'>
            <Link to={'/cart'} aria-label='cart'>
                {cartSize < 1 ?
                    <CartIcon
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        style={{ color: hover ? '#ffffff' : '#dcdcdc' }}
                    />
                    :
                    <Badge color='error' badgeContent={cartSize.toString()}>
                        <CartIcon
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            style={{ color: hover ? '#ffffff' : '#f5f5f5' }}
                        />
                    </Badge>
                }
            </Link>
        </div>
    );
}

export default Widget;