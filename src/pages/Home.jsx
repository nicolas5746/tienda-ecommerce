import React from 'react';
import { useLocation } from 'react-router-dom';
import { ItemContext } from '@/contexts/Contexts';
import ItemList from '@/components/home/ItemList';
import Notification from '@/layouts/Notification';
import Spinner from '@/layouts/Spinner';

const Home = () => {
  // Context
  const { items } = React.useContext(ItemContext);
  // Access to location object
  const location = useLocation();

  return (
    <>
      <main className='p-[1% 3.5% 5%]'>
        {items.length >= 1 ? <ItemList items={items} /> : <Spinner />}
      </main>
      {location.pathname === '/' && <Notification />}
    </>
  );
}

export default Home;