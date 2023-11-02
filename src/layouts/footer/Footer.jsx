import './footer.sass';

const Footer = () => {

    let copyright = ['Nicolás Batista Piñeyro', 2023];
    let link = 'https://nicolasbatista.netlify.app/';

    return (
        <footer className='footer'>
            <a href={link} target='_blank' rel='noopener noreferrer' aria-label='portfolio'>
                <p>{copyright[0]} &copy; {copyright[1]}</p>
            </a>
        </footer>
    );
}

export default Footer;