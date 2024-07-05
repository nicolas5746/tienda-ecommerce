import PropTypes from 'prop-types';
import Payment from '@ui/payment/Payment';
import './totalPrice.sass';

const TotalPrice = ({ style, totalPrice }) => {

    return (
        <div className='total-price-container'>
            <div className='cart-total-price' style={style}>
                <p  className='total-price-header'>precio total:</p>
                <p className='total-price'>usd&nbsp;{totalPrice}</p>
                <Payment />
            </div>
        </div>
    );
}

TotalPrice.propTypes = {
    style: PropTypes.object,
    totalPrice: PropTypes.number
}

export default TotalPrice;