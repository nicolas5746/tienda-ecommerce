/* eslint-disable no-constant-condition */
import { Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { scrollToTop } from '@utils/utils';
import Widget from '@layouts/widget/Widget';
import './navbar.sass';

const Navbar = () => {

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    }

    const categories = [
        { category: 'dama' },
        { category: 'caballero' },
        { category: 'unisex' },
        { category: 'niños' },
        { category: 'accesorios' }
    ];

    return (
        <header className='header'>
            <Disclosure as='nav' className='bg-gray-800'>
                {({ open }) => (
                    <>
                        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                            <div className='relative flex h-16 items-center justify-between'>
                                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                    <Disclosure.Button
                                        className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                        aria-label='open'
                                    >
                                        {open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
                                    </Disclosure.Button>
                                </div>
                                <img className='logo' alt='Tienda Americana' src='https://i.postimg.cc/Jh4Q7W6r/logo.png' style={{ marginRight: '2%' }} title='Tienda Americana' />
                                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start' onClick={() => scrollToTop()}>
                                    <Link to='/' className='flex flex-shrink-0 items-center' aria-label='home' title='Tienda Americana'>
                                        <h1 className='page-title'>Tienda Americana</h1>
                                    </Link>
                                    <div className='hidden sm:ml-10 sm:block'>
                                        <div className='flex space-x-4'>
                                            <Link to='/' aria-label='home' title='Inicio'>
                                                <div className={classNames(false ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-red-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}>
                                                    Inicio
                                                </div>
                                            </Link>
                                            {categories.map((item, index) => (
                                                <Link
                                                    to={`/category/${item.category}`}
                                                    className={classNames(false ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-red-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
                                                    aria-current={false ? 'page' : undefined}
                                                    aria-label='category'
                                                    key={index}
                                                    title={item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                                >
                                                    {item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                                </Link>))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                    <Menu as='div' className='relative ml-3'>
                                        <Widget />
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className='sm:hidden'>
                            <div className='space-y-1 px-2 pt-2 pb-3'>
                                <Link to='/' aria-label='home'>
                                    <div
                                        className={classNames(false ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                                        title='Inicio'
                                    >
                                        Inicio
                                    </div>
                                </Link>
                                {categories.map((item, index) => (
                                    <Link
                                        to={`/category/${item.category}`}
                                        className={classNames(false ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                                        aria-current={false ? 'page' : undefined}
                                        aria-label='category'
                                        key={index}
                                        title={item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                    >
                                        {item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                    </Link>))
                                }
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </header>
    );
}

export default Navbar;