import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, ItemContext, OrderContext } from '@/contexts/Contexts';
import { Close } from '@ui/Icons';
import { closeOnEvent } from '@/utils/utils';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import CartOrder from './CartOrder';
import ItemImage from '@/components/product/ItemImage';
import TotalPrice from '@/layouts/TotalPrice';
import Counter from '@ui/Counter';
import Spacer from '@ui/Spacer';

const CartTable = () => {
    // JS Local Storage
    const lsSelectedSize = JSON.parse(window.localStorage.getItem('selectedSize'));
    // Context
    const { cart, cartSize, handleSubTotalPrice, handleTotalPrice, handleIncreaseItem, handleDecreaseItem, handleStoreSize, notification, purchaseIsFinished, showCart, showForm, toggleShowCart } = React.useContext(CartContext);
    const { getItemCategory, getItemColour, getItemModel } = React.useContext(ItemContext);
    const { sucessfulOrder, toggleOrder } = React.useContext(OrderContext);
    // States
    const [hover, setHover] = React.useState(false);
    const [selectedSize, setSelectedSize] = React.useState(lsSelectedSize || cart.map((item) => ({ id: item.id, size: Array.isArray(item.size) ? item.size[0] : item.size })));
    // Reference value
    const cartTableRef = React.useRef(null);
    // Access to navigation object
    const navigate = useNavigate();
    // On change selected size, store only new value by its id and hold other ids' previous selected
    const handleOnChange = (event, id) => setSelectedSize(selectedSize.map((prev) => (prev.id === id) ? { ...prev, size: (typeof prev.size === 'number') ? parseInt(event.target.value) : event.target.value } : prev));
    // Close cart and return to previous page
    const handleCloseCart = React.useCallback(() => {
        toggleShowCart(false);
        toggleOrder(false);
        navigate(-1);
    }, [navigate, toggleOrder, toggleShowCart]);
    // Close cart when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, !purchaseIsFinished, cartTableRef, handleCloseCart);
    }, [handleCloseCart, purchaseIsFinished]);
    // Apply events to close cart
    React.useEffect(() => {
        if (showCart && !showForm && !notification.show) {
            document.addEventListener('click', handleCloseOnEvent, true);
            document.addEventListener('keydown', handleCloseOnEvent, true);
            return () => {
                document.removeEventListener('click', handleCloseOnEvent, true);
                document.removeEventListener('keydown', handleCloseOnEvent, true);
            }
        }
    }, [handleCloseOnEvent, notification.show, showCart, showForm]);
    // Close checkout and reset cart
    React.useEffect(() => {
        if (sucessfulOrder) {
            document.addEventListener('click', handleCloseOnEvent);
            document.addEventListener('keydown', handleCloseOnEvent);
            return () => {
                document.removeEventListener('click', handleCloseOnEvent);
                document.removeEventListener('keydown', handleCloseOnEvent);
            }
        }
    }, [handleCloseOnEvent, sucessfulOrder]);
    React.useEffect(() => {
        // Map current cart's id and size and check for duplicates
        const currentCart = cart.map((item) => ({ id: item.id, size: Array.isArray(item.size) ? item.size[0] : item.size }));
        const isDuplicated = (prev, added) => prev.id === added.id;
        const filteredSizes = (prev, added, callback) => prev.filter((item) => !added.some((duplicated) => callback(item, duplicated)));
        const newSizes = filteredSizes(currentCart, selectedSize, isDuplicated);
        // Update and remove duplicates
        const updatedSizes = [...selectedSize, ...newSizes];
        const removeDuplicates = updatedSizes.filter((obj, index, items) => items.findIndex((item) => (item.id === obj.id)) === index);
        // Store sizes
        setSelectedSize(removeDuplicates);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]); // Do not listen selectedSize to prevent an infinite loop
    // Update selected sizes
    React.useEffect(() => {
        // Filter and map each cart item's id and compare with selected sizes' ids
        const ids = cart.filter((obj) => obj.id).map((obj) => obj.id);
        const selectedSizeById = selectedSize.filter((item) => ids.includes(item.id));
        if (selectedSize.length !== selectedSizeById.length) setSelectedSize(selectedSizeById);
    }, [cart, selectedSize]);
    // Save to cart context
    React.useEffect(() => {
        handleStoreSize(selectedSize);
    }, [handleStoreSize, selectedSize]);
    // Save selected sizes in local storage
    React.useEffect(() => {
        window.localStorage.setItem('selectedSize', JSON.stringify(selectedSize));
    }, [selectedSize]);

    return (
        <div className='absolute flex flex-row justify-center bg-transparent-grey inset-0 m-0 p-0' style={{ zIndex: '2' }}>
            {showCart &&
                <div
                    className='relative flex flex-row bg-gainsboro rounded-md h-[85%] w-[95%] p-[2%]'
                    ref={cartTableRef}
                    style={{ margin: '2vh auto' }}
                >
                    <div className={`flex flex-col w-[80%] ${cartSize > 1 ? 'm-0' : 'my-[10%]'} p-0 overflow-y-scroll hide-scrollbar`}>
                        <Close
                            color={hover ? 'error' : 'primary'}
                            onClick={handleCloseCart}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            style={{ cursor: 'pointer', left: '0.5%', position: 'absolute', top: '0.5%' }}
                        />
                        {cart.map((item, index) => (<div className='flex flex-row items-center justify-evenly bg-gainsboro w-full m-[0 auto 8%] rounded-md' key={item.id}>
                            <div className='relative w-2/5 m-0 scale-[0.8] xs:scale-100'>
                                <ItemImage item={item} optionalText={`código del artículo: ${item.id}`} />
                                <div className='text-center m-[2%]'>
                                    <p className='text-center text-roman-silver text-2sm first-letter:uppercase'>precio:</p>
                                    <p className='text-navy text-2sm font-medium uppercase'>usd&nbsp;{item.priceUsd}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-center text-center w-1/2 mb-[5%] scale-[0.7] xs:scale-100'>
                                <div className='flex flex-col items-center justify-between mt-4'>
                                    <Link to={`../product/${item.id}`} aria-label='item-id'>
                                        <h2 className='text-center text-2xl text-tomato-sauce capitalize p-[1%] whitespace-nowrap'>{item.brand}</h2>
                                        {getItemModel(item, { whiteSpace: 'wrap' })}
                                    </Link>
                                    <Spacer value={2} />
                                    <div className='text-center p-0'>{getItemCategory(item)}{getItemColour(item)}</div>
                                    <Spacer value={2} />
                                    <Box sx={{ minWidth: 60 }}>
                                        <FormControl fullWidth>
                                            {Array.isArray(item.size) ?
                                                <>
                                                    <InputLabel htmlFor={item.id} variant='standard'>Talla (EU)</InputLabel>
                                                    <NativeSelect
                                                        defaultValue={selectedSize[index]?.size}
                                                        inputProps={{ id: item.id, name: 'size' }}
                                                        onChange={(event) => handleOnChange(event, item.id)}
                                                        sx={{ backgroundColor: blue[50], color: blue[900], fontWeight: '500' }}
                                                    >
                                                        {item.size.map((size, i) => <option key={i} value={size}>{size}</option>)}
                                                    </NativeSelect>
                                                </>
                                                :
                                                <p className='text-base text-roman-silver font-semibold first-letter:uppercase'>{item.size}</p>}
                                        </FormControl>
                                    </Box>
                                    <Spacer value={1.5} />
                                    <p className='text-center text-roman-silver text-2sm first-letter:uppercase'>subtotal:</p>
                                    <p className='text-center text-base text-tomato-sauce font-semibold uppercase'>usd&nbsp;{handleSubTotalPrice(item)}</p>
                                    <Spacer value={5} />
                                    <Counter addItem={() => handleIncreaseItem(item.id)} removeItem={() => handleDecreaseItem(item.id)} quantity={item.quantity} />
                                </div>
                            </div>
                        </div>))}
                    </div>
                    <div className='flex flex-col items-center justify-around'>
                        <TotalPrice totalPrice={handleTotalPrice()} style={{ marginTop: '25vh' }} />
                        <CartOrder />
                    </div>
                </div>}
        </div>
    );
}

export default CartTable;