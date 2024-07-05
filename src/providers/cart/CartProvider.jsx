import React from 'react';
import PropTypes from 'prop-types';
import * as firestore from 'firebase/firestore';
import { CartContext } from '@contexts/contexts';
import { database } from '@lib/firebase/index';

const CartProvider = ({ children }) => {
    // JS Local Storage
    const lsCart = JSON.parse(window.localStorage.getItem('cart'));
    // States
    const [showCart, setShowCart] = React.useState(false);
    const [showForm, setShowForm] = React.useState(false);
    const [purchaseIsFinished, setPurchaseIsFinished] = React.useState(false);
    const [cart, setCart] = React.useState(lsCart || []);
    const [addedItem, setAddedItem] = React.useState(1);
    // Function to check if an item is already in cart
    const handleIsInCart = (id) => {
        return id !== undefined ? cart.find(item => item.id === id) : undefined;
    }
    // Function to add an item to cart
    const handleAddToCart = (item) => {
        if (item.stock < 1) alert(`No hay stock disponible para éste artículo!`);
        if (item.stock >= 1) {
            const addItem = {
                id: item.id,
                brand: item.brand,
                model: item.model,
                image: item.image,
                category: item.category,
                colour: item.colour,
                priceUsd: item.price_usd,
                stock: item.stock,
                quantity: addedItem,
            }
            setAddedItem(1);
            setCart([...cart, addItem]);
        }
    }
    // Function to remove an item from cart
    const handleRemoveFromCart = (id) => {
        (window.confirm(`¿Deseas eliminar éste producto de tu carrito?`))
            ?
            cart.forEach((item, index) => {
                if (item.id === id) {
                    item.quantity = 1;
                    cart.splice(index, 1);
                }
            })
            :
            cart.forEach((item) => {
                if (item.id === id && item.quantity < 1) item.quantity++;
            });
        setCart([...cart]);
    }
    // Function to reset cart
    const handleResetCart = React.useCallback(() => {
        setCart([]);
        setPurchaseIsFinished(false);
        setShowCart(false);
        setShowForm(false);
        window.localStorage.clear();
    }, []);
    // Function to confirm if remove all items from cart
    const handleClearCart = () => {
        (window.confirm(`¿Deseas vaciar tu carrito?`)) ? handleResetCart() : setCart([...cart]);
    }
    // Function to calculate subtotal price of each item    
    const handleSubTotalPrice = (item) => {
        let subTotal = item.priceUsd * item.quantity;
        return subTotal;
    }
    // Function to calculate total price of all added items to cart
    const handleTotalPrice = () => {
        let total = 0;
        cart.map((item) => {
            return total += item.priceUsd * item.quantity;
        });
        return total;
    }
    // Function to increase quantity of an item already added to cart
    const handleIncreaseItem = (id) => {
        cart.forEach((item) => {
            if (item.id === id) {
                if (item.quantity >= item.stock) alert(`No hay más stock disponible para éste artículo!`);
                if (item.quantity < item.stock) item.quantity++;
            }
        });
        setCart([...cart]);
    }
    // Function to decrease quantity of an item already added to cart
    const handleDecreaseItem = (id) => {
        cart.forEach((item) => {
            if (item.id === id) {
                if (item.quantity > 0) item.quantity--;
                if (item.quantity < 1) handleRemoveFromCart(item.id);
            }
        });
        setCart([...cart]);
    }
    // Function to get all items id's and quantities added to cart
    const handleAddedItems = () => {
        return cart.map((item) => (
            {
                id: item.id,
                brand: item.brand,
                model: item.model,
                quantity: item.quantity
            }
        ));
    }
    // Function to update Stock in database after purchase is finished
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
    // Callback to hide Cart form
    const handleHideCartForm = React.useCallback(() => {
        setShowForm(false);
    }, []);
    // Toggle conditioners
    const toggleCartForm = (value) => (value) ? setShowForm(true) : setShowForm(false);
    const toggleCheckout = (value) => (value) ? setPurchaseIsFinished(true) : setPurchaseIsFinished(false);
    const toggleShowCart = (value) => (value) ? setShowCart(true) : setShowCart(false);
    // Storage cart in browser
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
            handleClearCart,
            handleResetCart,
            handleSubTotalPrice,
            handleTotalPrice,
            handleIncreaseItem,
            handleDecreaseItem,
            handleAddedItems,
            handleUpdateStock,
            purchaseIsFinished,
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