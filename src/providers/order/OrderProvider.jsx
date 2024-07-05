import React from 'react';
import PropTypes from 'prop-types';
import * as firestore from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { OrderContext } from '@contexts/contexts';
import { database } from '@lib/firebase/index';

const OrderProvider = ({ children }) => {
    // States
    const [orderId, setOrderId] = React.useState('');
    const [success, setSucess] = React.useState(false);
    // Function to send order to database
    const handleSendOrder = async (form, addedItems, totalPrice) => {

        const randomIdNumber = new Date().toISOString().slice(0, 10).split('-').join('') + window.crypto.getRandomValues(new Uint32Array(1));

        const order = {
            buyer: {
                first_name: form.firstName,
                last_name: form.lastName,
                phone: form.phone,
                email: form.email
            },
            items: addedItems(),
            timestamp: firestore.serverTimestamp(),
            total: totalPrice()
        }

        try {
            await firestore.setDoc(firestore.doc(database, 'OrderCollection', randomIdNumber), order);
            setOrderId(randomIdNumber);
            setSucess(true);
        } catch (error) {
            setSucess(false);
            if (error instanceof FirebaseError) alert(`Error cargando base de datos: ` + error.message);
            console.error(error);
        }
    }
    // Set Order ID to an empty string
    const handleClearOrderId = () => setOrderId('');

    return (
        <OrderContext.Provider value={{ handleClearOrderId, handleSendOrder, orderId, success }}>
            {children}
        </OrderContext.Provider>
    );
}

OrderProvider.propTypes = { children: PropTypes.node }

export default OrderProvider;