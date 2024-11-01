import PropTypes from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup';
import { AddItem, AddToCartIcon, RemoveItem } from './Icons';

const Counter = ({ addItem, removeItem, quantity }) => {

    return (
        <div className='flex flex-col items-center m-[5%]'>
            <AddToCartIcon badgeColor='error' cartColor='info' iconButtonColor='primary' quantity={quantity} />
            <ButtonGroup>
                <RemoveItem color='primary' fontSize='smaller' onClick={removeItem} style={{ fontSize: '0.8rem', marginRight: '1%' }} title='Remover' variant='contained' />
                <AddItem color='primary' fontSize='smaller' onClick={addItem} style={{ fontSize: '0.8rem', marginLeft: '1%' }} title='Agregar' variant='contained' />
            </ButtonGroup>
        </div>
    );
}

Counter.propTypes = {
    addItem: PropTypes.func,
    removeItem: PropTypes.func,
    quantity: PropTypes.number
}

export default Counter;