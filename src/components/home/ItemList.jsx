import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { SearchInput } from '@ui/Inputs';
import Item from './Item';

const ItemList = ({ items }) => {
    // Hooks
    const [filter, setFilter] = React.useState('');
    // Dynamic parameter
    const { category } = useParams();
    // Changes the state every time you modify your input
    const handleOnChange = (event) => setFilter(event.target.value);
    // Filter items by brand or model no matter what sort of letter case is input
    const filtered = (item) => {
        return item.brand.match(filter.toLowerCase()) || item.model.match(filter.toLowerCase());
    }

    return (
        <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='greeting text-center text-base 3md:text-5lg font-semibold font-poppins p-[1%] rounded-lg bg-gradient-to-r from-ferrari via-royal-blue to-crimson text-transparent bg-clip-text bg-200% animate-greet'>
                Las mejores marcas al mejor precio
            </h1>
            <SearchInput className='search flex flex-row items-center justify-center p-[1%]' label='Buscar' name='filter' onChange={handleOnChange} placeholder='Ingresar marca o modelo' type='text' value={filter} />
            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  bg-gainsboro p-[3%] gap-y-10 gap-x-6 xl:gap-x-8'>
                {category ?
                    items.filter((item) => item.category === category).filter(filtered).map((item) => <Item item={item} key={item.id} />)
                    :
                    items.filter(filtered).map((item) => <Item item={item} key={item.id} />)}
            </div>
        </div>
    );
}

ItemList.propTypes = { items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]) }

export default ItemList;