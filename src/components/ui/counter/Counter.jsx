import PropTypes from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup';
import { AddItem, AddToCartIcon, RemoveItem } from '@ui/icons/Icons';
import './counter.sass';

const Counter = ({ addItem, removeItem, quantity }) => {

    return (
        <div className='counter'>
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