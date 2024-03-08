import React from 'react';
import { ItemContext } from '@contexts/contexts';
import { scrollToTop } from '@utils/utils';
import ItemList from '@components/home/itemList/ItemList';
import Spinner from '@ui/spinner/Spinner';
import './home.sass';

const Home = () => {
  // Context
  const { items } = React.useContext(ItemContext);

  return (
    <main className='home'>
      {scrollToTop()}
      {items.length >= 1
        ?
        <ItemList items={items} />
        :
        <Spinner />
      }
    </main>
  );
}

export default Home;