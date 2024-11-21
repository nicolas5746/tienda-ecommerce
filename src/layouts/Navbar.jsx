import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { closeOnEvent, isInView, scrollToTop } from '@/utils/utils';
import Widget from './Widget';

const Navbar = () => {
    // Reference value
    const buttonRef = React.useRef(null);
    const navbarRef = React.useRef(null);
    const xMarkRef = React.useRef(null);

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
    // Close navbar and scroll instantly to top
    const onClickCloseNavbar = (close) => {
        window.scrollTo(0, 0);
        close();
    }
    // Close navbar when clicking on background or pressing down 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        closeOnEvent(event, true, navbarRef, () => isInView(xMarkRef, () => buttonRef.current?.click()))
    }, []);
    // Apply events to close navbar
    React.useEffect(() => {
        document.addEventListener('click', handleCloseOnEvent, true);
        document.addEventListener('keydown', handleCloseOnEvent, true);
        return () => {
            document.removeEventListener('click', handleCloseOnEvent, true);
            document.removeEventListener('keydown', handleCloseOnEvent, true);
        }
    }, [handleCloseOnEvent]);

    return (
        <header className='fixed left-0 right-0 top-0' style={{ zIndex: '1' }}>
            <Disclosure as='nav' className='bg-gray-800 rounded-b-xl 4md:rounded-b-3xl' ref={navbarRef}>
                {({ open, close }) => (
                    <>
                        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                            <div className='relative flex h-16 items-center justify-between'>
                                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                    <DisclosureButton
                                        className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                        aria-label='open'
                                        ref={buttonRef}
                                    >
                                        {open ? <div ref={xMarkRef}><XMarkIcon className='block h-6 w-6' aria-hidden='true' /></div> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
                                    </DisclosureButton>
                                </div>
                                <img className='hidden lg:block w-[5%] mr-[2%]' alt='Tienda Americana' src='https://res.cloudinary.com/dmnyy2q99/image/upload/v1729533634/title_cprjlh.png' title='Tienda Americana' />
                                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start' onClick={() => scrollToTop()}>
                                    <Link to='../' className='flex flex-shrink-0 items-center text-base text-roman-silver hover:text-gainsboro roboto hover:scale-105' aria-label='home' title='Tienda Americana'>
                                        <h1 className='text-center align-middle text-sm 4md:text-3sm lg:text-5lg text-crimson hover:text-windows-blue font-normal hover:font-extrabold font-bungee-inline'>Tienda Americana</h1>
                                    </Link>
                                    <div className='hidden sm:ml-10 sm:block'>
                                        <div className='flex space-x-4 capitalize'>
                                            <Link to='../' aria-label='home' title='Inicio'>
                                                <div className={classNames(classNames ? 'text-gray-300 hover:bg-red-700 hover:text-white' : 'bg-gray-900 text-white', 'px-3 py-2 rounded-md text-base font-medium')}>
                                                    Inicio
                                                </div>
                                            </Link>
                                            {categories.map((item, index) => (
                                                <Link
                                                    to={`../category/${item.category}`}
                                                    className={classNames(classNames ? 'text-gray-300 hover:bg-red-700 hover:text-white' : 'bg-gray-900 text-white', 'px-3 py-2 rounded-md text-base font-medium')}
                                                    aria-current={classNames ? undefined : 'page'}
                                                    aria-label='category'
                                                    key={index}
                                                    title={item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                                >
                                                    {item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                                </Link>))}
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
                        <DisclosurePanel className='sm:hidden'>
                            <div className='space-y-1 capitalize px-2 pt-2 pb-3'>
                                <Link to='../' aria-label='home' onClick={() => onClickCloseNavbar(close)}>
                                    <div
                                        className={classNames(classNames ? 'text-center text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-900 text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                                        title='Inicio'
                                    >
                                        Inicio
                                    </div>
                                </Link>
                                {categories.map((item, index) => (
                                    <Link
                                        to={`../category/${item.category}`}
                                        className={classNames(classNames ? 'text-center text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-900 text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                                        aria-current={classNames ? undefined : 'page'}
                                        aria-label='category'
                                        key={index}
                                        onClick={() => onClickCloseNavbar(close)}
                                        title={item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                    >
                                        {item.category.toString().charAt(0).toUpperCase() + item.category.toString().slice(1)}
                                    </Link>))}
                            </div>
                        </DisclosurePanel>
                    </>)}
            </Disclosure>
        </header>
    );
}

export default Navbar;