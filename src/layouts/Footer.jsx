import React from 'react';

const Footer = () => {

    const [portfolio, setPortfolio] = React.useState('');

    React.useEffect(() => {
        const url = 'https://api.npoint.io/0274475edb0f9685ef3d';
        fetch(url)
            .then((response) => response.json())
            .then((response) => setPortfolio(response.url))
            .catch((error) => {
                console.error(error.message);
                setPortfolio('');
            });
    }, []);

    return (
        <footer className='fixed flex items-center justify-center bg-transparent-grey h-[10%] w-full bottom-0 left-0 right-0' style={{ zIndex: '2' }}>
            <a href={portfolio} target='_blank' rel='noopener noreferrer' aria-label='portfolio' title={portfolio}>
                <p className='relative text-center text-2sm sm:text-base text-linen font-lato'>Nicolás Batista Piñeyro &copy; 2023</p>
            </a>
        </footer>
    );
}

export default Footer;