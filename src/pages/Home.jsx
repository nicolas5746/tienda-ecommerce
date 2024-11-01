import React from 'react';
import { ItemContext } from '@/contexts/Contexts';
import ItemList from '@/components/home/ItemList';
import Spinner from '@/layouts/Spinner';

const Home = () => {
  // Context
  const { items } = React.useContext(ItemContext);

  return (
    <main className='p-[1% 3.5% 5%]'>
      {items.length >= 1 ? <ItemList items={items} /> : <Spinner />}
    </main>
  );
}

export default Home;