import React from 'react';
import PropTypes from 'prop-types';
import * as firestore from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { OrderContext } from '@/contexts/Contexts';
import { database } from '@/lib/firebase/config';

const OrderProvider = ({ children }) => {
    // States
    const [sucessfulOrder, setSucessfulOrder] = React.useState(false);
    const [failedOrder, setFailedOrder] = React.useState(false);
    const [failureMessage, setFailureMessage] = React.useState('');
    const [orderId, setOrderId] = React.useState('');
    // Send order to database
    const handleSendOrder = async (form, addedItems, totalPrice) => {

        const randomIdNumber = new Date().toISOString().slice(0, 10).split('-').join('') + window.crypto.getRandomValues(new Uint32Array(1));
        const orderRef = firestore.doc(database, 'OrderCollection', randomIdNumber);

        const order = {
            buyer: {
                first_name: form.firstName,
                last_name: form.lastName,
                phone: form.phone,
                email: form.email
            },
            items: addedItems(),
            total: totalPrice()
        }

        setSucessfulOrder(false);
        setFailedOrder(false);
        setOrderId('');
        setFailureMessage('');

        try {
            await firestore.setDoc(orderRef, order);
            await firestore.updateDoc(orderRef, { timestamp: firestore.serverTimestamp() });
            setOrderId(randomIdNumber);
            setSucessfulOrder(true);
        } catch (error) {
            setFailureMessage(error.message);
            setFailedOrder(true);
            console.error(error);
            if (error instanceof FirebaseError) alert(`Error cargando base de datos: ` + error.message);
        }
    }

    const toggleOrder = (value) => (value) ? setSucessfulOrder(true) : setSucessfulOrder(false);

    return (
        <OrderContext.Provider value={{ failedOrder, failureMessage, handleSendOrder, orderId, sucessfulOrder, toggleOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

OrderProvider.propTypes = { children: PropTypes.node }

export default OrderProvider;