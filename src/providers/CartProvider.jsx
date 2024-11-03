import React from 'react';
import PropTypes from 'prop-types';
import * as firestore from 'firebase/firestore';
import { CartContext } from '@/contexts/Contexts';
import { database } from '@/lib/firebase/config';

const CartProvider = ({ children }) => {
    // JS Local Storage
    const lsCart = JSON.parse(window.localStorage.getItem('cart'));
    // States
    const [showCart, setShowCart] = React.useState(false);
    const [showForm, setShowForm] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [notification, setNotification] = React.useState({ accept: null, decline: null, declinable: false, show: false });
    const [purchaseIsFinished, setPurchaseIsFinished] = React.useState(false);
    const [cart, setCart] = React.useState(lsCart || []);
    const [size, setSize] = React.useState([]);
    const [addedItem, setAddedItem] = React.useState(1);
    // Show and hide notifications
    const handleNotification = (values, msg) => {
        setMessage(msg);
        setNotification(values);
    }
    // Reset notification and message to default
    const resetNotification = React.useCallback(() => {
        handleNotification({ accept: null, decline: null, declinable: false, show: false }, '');
    }, []);
    // Check if an item is already in cart
    const handleIsInCart = (id) => {
        return id !== undefined ? cart.find(item => item.id === id) : undefined;
    }
    // Add an item to cart
    const handleAddToCart = (item) => {
        if (item.stock < 1) handleNotification({ accept: () => setNotification({ show: false }), decline: null, declinable: false, show: true }, 'No hay stock disponible para éste artículo!');
        if (item.stock >= 1) {
            const addItem = {
                id: item.id,
                brand: item.brand,
                model: item.model,
                image: item.image,
                category: item.category,
                colour: item.colour,
                size: item.size,
                priceUsd: item.price_usd,
                stock: item.stock,
                quantity: addedItem
            }
            setAddedItem(1);
            setCart([...cart, addItem]);
        }
    }
    // Remove an item from cart
    const handleRemoveFromCart = (id, abort) => {
        (abort) ?
            cart.forEach((item) => {
                if (item.id === id && item.quantity < 1) item.quantity++;
            })
            :
            cart.forEach((item, index) => {
                if (item.id === id) {
                    item.quantity = 1;
                    cart.splice(index, 1);
                }
            });
        resetNotification();
        setCart([...cart]);
    }
    // Empty cart
    const handleResetCart = React.useCallback(() => {
        resetNotification();
        setCart([]);
        setPurchaseIsFinished(false);
        setShowForm(false);
        setShowCart(false);
        window.localStorage.clear();
    }, [resetNotification]);
    // Confirm if remove all items from cart
    const handleUpdateCart = () => {
        resetNotification();
        setCart([...cart]);
    }
    // Function to calculate subtotal price of each item    
    const handleSubTotalPrice = (item) => {
        let subTotal = item.priceUsd * item.quantity;
        return subTotal;
    }
    // Calculate total price of all added items to cart
    const handleTotalPrice = () => {
        let total = 0;
        cart.map((item) => {
            return total += item.priceUsd * item.quantity;
        });
        return total;
    }
    // Increase quantity of an item already added to cart
    const handleIncreaseItem = (id) => {
        cart.forEach((item) => {
            if (item.id === id) {
                if (item.quantity >= item.stock) handleNotification({ accept: () => setNotification({ show: false }), decline: null, declinable: false, show: true }, 'No hay más stock disponible para éste artículo!');
                if (item.quantity < item.stock) item.quantity++;
            }
        });
        setCart([...cart]);
    }
    // Decrease quantity of an item already added to cart
    const handleDecreaseItem = (id) => {
        cart.forEach((item) => {
            if (item.id === id) {
                if (item.quantity > 0) item.quantity--;
                if (item.quantity < 1) handleNotification({ accept: () => handleRemoveFromCart(item.id, false), decline: () => handleRemoveFromCart(item.id, true), declinable: true, show: true }, '¿Deseas eliminar éste producto de tu carrito?');
            }
        });
        setCart([...cart]);
    }
    // Save selected value to state
    const handleStoreSize = (selected) => setSize(selected);
    // Filter selected sizes by id and return selected as integer or string accordingly
    const filteredSize = (size, id) => {
        const hasNumber = /\d/;
        const filtered = size.filter((obj) => obj.size && obj.id === id).map((obj) => obj.size);
        if (hasNumber.test(filtered.toString())) {
            return Number(filtered);
        } else {
            return filtered.toString();
        }
    }
    // Get all items id's and quantities added to cart
    const handleAddedItems = () => {
        return cart.map((item) => ({
            id: item.id,
            brand: item.brand,
            model: item.model,
            quantity: item.quantity,
            size: filteredSize(size, item.id)
        }));
    }
    // Update stock in database after purchase is finished
    const handleUpdateStock = async () => {
        try {
            const batch = firestore.writeBatch(database);
            // Get each item quantity to update current stock
            cart.forEach((item) => {
                const itemId = firestore.doc(database, 'ItemCollection', item.id);
                const newStock = item.stock - item.quantity;
                // Update stock
                batch.update(itemId, { stock: newStock });
            });
            // Commit the batch
            await batch.commit();
        } catch (error) {
            console.error(error);
        }
    }
    // Hide cart form
    const handleHideCartForm = React.useCallback(() => {
        setShowForm(false);
    }, []);
    // Toggle conditioners
    const toggleCartForm = (value) => (value) ? setShowForm(true) : setShowForm(false);
    const toggleCheckout = (value) => (value) ? setPurchaseIsFinished(true) : setPurchaseIsFinished(false);
    const toggleShowCart = (value) => (value) ? setShowCart(true) : setShowCart(false);
    // Save cart items in local storage
    React.useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    // Pop state events
    React.useEffect(() => {
        (purchaseIsFinished)
            ?
            window.addEventListener('popstate', handleResetCart, { once: true })
            :
            window.removeEventListener('popstate', handleResetCart);
        (showForm)
            ?
            window.addEventListener('popstate', handleHideCartForm, { once: true })
            :
            window.removeEventListener('popstate', handleHideCartForm);
    }, [handleHideCartForm, handleResetCart, purchaseIsFinished, showForm]);

    return (
        <CartContext.Provider value={{
            cart,
            cartSize: cart.length,
            handleIsInCart,
            handleAddToCart,
            handleRemoveFromCart,
            handleResetCart,
            handleUpdateCart,
            handleSubTotalPrice,
            handleTotalPrice,
            handleIncreaseItem,
            handleDecreaseItem,
            handleStoreSize,
            handleAddedItems,
            handleUpdateStock,
            handleNotification,
            message,
            notification,
            purchaseIsFinished,
            resetNotification,
            showCart,
            showForm,
            toggleCheckout,
            toggleCartForm,
            toggleShowCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = { children: PropTypes.node }

export default CartProvider;