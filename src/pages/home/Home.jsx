import React from 'react';
import { ItemContext } from '@contexts/contexts';
import ItemList from '@components/home/itemList/ItemList';
import Spinner from '@ui/spinner/Spinner';

const Home = () => {
  // Context
  const { items } = React.useContext(ItemContext);

  return (
    <main style={{ padding: '1% 3.5% 5%' }}>
      {items.length >= 1 ? <ItemList items={items} /> : <Spinner />}
    </main>
  );
}

export default Home;