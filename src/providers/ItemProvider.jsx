import React from 'react';
import PropTypes from 'prop-types';
import * as firestore from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { Link } from 'react-router-dom';
import { ItemContext } from '@/contexts/Contexts';
import { database } from '@/lib/firebase/config';

const ItemProvider = ({ children }) => {
    // States
    const [items, setItems] = React.useState([]);
    // Get items from database
    const getItems = async () => {

        const itemCollectionRef = firestore.collection(database, 'ItemCollection');

        await firestore
            .getDocs(itemCollectionRef)
            .then((response) => {
                if (response.size === 0) {
                    setInterval(() => {
                        if (window.confirm(`No se pudo cargar la base de datos. ¿desea recargar la página?`)) window.location.reload();
                    }, 30000);
                }
                setItems(response.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            })
            .catch((error) => {
                if (error instanceof FirebaseError) alert(`Error cargando base de datos: ` + error.message);
                console.error(error);
            });
    }
    // Get item category
    const getItemCategory = (item) => {

        return (
            <p className='text-center text-roman-silver text-2sm first-letter:uppercase'>categoría:
                <Link to={`/category/${item.category}`} aria-label='category'>
                    <span className='text-center text-blood text-2sm capitalize whitespace-nowrap'>&nbsp;{item.category}</span>
                </Link>
            </p>
        );
    }
    // Get item colour
    const getItemColour = (item) => {

        return (
            <p className='text-2sm text-roman-silver first-letter:uppercase'>color:
                <span className='text-2sm first-letter:uppercase'>&nbsp;{item.colour.toString().charAt(0).toUpperCase() + item.colour.toString().slice(1).toLowerCase()}</span>
            </p>
        );
    }
    // Get item image
    const getItemImage = (item) => {

        return (
            <img className='h-full w-full object-cover object-center lg:h-full lg:w-full' alt={item.model.toUpperCase()} src={item.image} title={item.model.toUpperCase()} />
        );
    }
    // Get item model
    const getItemModel = (item, style) => {

        return (
            <p className='text-center text-base text-windows-blue font-semibold capitalize p-[1%]' style={style}>{item.model}</p>
        );
    }
    // Update items
    React.useEffect(() => {
        getItems();
    }, []);

    return (
        <ItemContext.Provider value={{ items, getItems, getItemCategory, getItemColour, getItemModel, getItemImage }}>
            {children}
        </ItemContext.Provider>
    );
}

ItemProvider.propTypes = { children: PropTypes.node }

export default ItemProvider;