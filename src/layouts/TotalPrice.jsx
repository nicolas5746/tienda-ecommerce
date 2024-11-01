import PropTypes from 'prop-types';
import Payment from './Payment';

const TotalPrice = ({ style, totalPrice }) => {

    return (
        <div className='relative flex flex-row items-center justify-center'>
            <div className='absolute flex flex-col justify-center m-[1%]' style={style}>
                <p className='text-center font-medium capitalize m-[1%]'>precio total:</p>
                <p className='text-center text-2lg text-tomato-sauce font-bold uppercase p-[1%] whitespace-nowrap'>usd&nbsp;{totalPrice}</p>
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