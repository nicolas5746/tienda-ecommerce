import PropTypes from 'prop-types';
import Payment from '@ui/payment/Payment';
import './totalPrice.sass';

const TotalPrice = ({ style, totalPrice }) => {

    return (
        <div className='total-price-container'>
            <div className='cart-total-price' style={style}>
                <p
                    style={{
                        fontWeight: '500',
                        margin: '1%',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        textTransform: 'capitalize'
                    }}
                >
                    {`precio total: `}
                    <span className='total-price'>{`usd ${totalPrice}`}</span>
                </p>
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