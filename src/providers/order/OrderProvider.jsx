import React from 'react';
import PropTypes from 'prop-types';
import * as firestore from 'firebase/firestore';
import { OrderContext } from '@contexts/contexts';
import { database } from '@lib/firebase/index';

const OrderProvider = ({ children }) => {
    // States
    const [orderId, setOrderId] = React.useState([]);
    // Function to send order to database
    const handleSendOrder = async (form, addedItems, totalPrice) => {

        const order = {
            buyer: {
                first_name: form.firstName,
                last_name: form.lastName,
                phone: form.phone,
                email: form.email
            },
            items: addedItems,
            total: totalPrice
        }

        const randomIdNumber = '0000' + window.crypto.getRandomValues(new Uint32Array(1));

        await firestore.setDoc(firestore.doc(database, 'OrderCollection', randomIdNumber), order);

        setOrderId(randomIdNumber);
    }

    return (
        <OrderContext.Provider value={{ handleSendOrder, orderId, setOrderId }}>
            {children}
        </OrderContext.Provider>
    );
}

OrderProvider.propTypes = {
    children: PropTypes.node
}

export default OrderProvider;