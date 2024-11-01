import { HomeButton } from '@ui/Buttons';

const NotFound = () => {
    // Tailwind Classes
    const paragraphClass = 'text-center text-base 3md:text-xl text-windows-blue font-normal first-letter:uppercase font-lato mb-[10%] 3md:mb-[2%]';

    return (
        <section className='absolute flex flex-col items-center justify-center p-[25%] 3md:p-[10%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <p className={paragraphClass}>error</p>
            <h1 className='text-center text-4xl 3md:text-8xl text-windows-blue font-semibold first-letter:uppercase font-lato'>404</h1>
            <p className={paragraphClass}>página no encontrada</p>
            <HomeButton style={{ borderRadius: '0.3em', padding: '3%', width: '120%' }} text='Ir al Inicio' title='Ir al Inicio' />
        </section>
    );
}

export default NotFound;