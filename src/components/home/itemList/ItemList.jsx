import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { SearchInput } from '@ui/inputs/Inputs';
import Item from '@components/home/item/Item';
import './itemList.sass';

const ItemList = ({ items }) => {
    // Hooks
    const [filter, setFilter] = React.useState('');
    // Dynamic parameter
    const { category } = useParams();
    // This function sets the setFilter state every time you change your input
    const handleOnChange = (event) => setFilter(event.target.value);
    // This function will filter items by brand or model no matter what sort of case is input
    const filtered = (item) => {
        return item.brand.match(filter.toLowerCase()) || item.model.match(filter.toLowerCase());
    }

    return (
        <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='greeting'>Las mejores marcas al mejor precio</h1>
            <SearchInput className='search' label='Buscar' name='filter' onChange={handleOnChange} placeholder='Ingresar marca o modelo' type='text' value={filter} />
            <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {category ?
                    items.filter((item) => item.category === category).filter(filtered).map((item) => <Item item={item} key={item.id} />)
                    :
                    items.filter(filtered).map((item) => <Item item={item} key={item.id} />)
                }
            </div>
        </div>
    );
}

ItemList.propTypes = { items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]) }

export default ItemList;