const Dots = () => {

    return (
        <div className='relative flex flex-row'>
            <div className='h-5 w-5 bg-red rounded-full animate-bounce [animation-delay:-0.3s] mx-0.5'></div>
            <div className='h-5 w-5 bg-red rounded-full animate-bounce [animation-delay:-0.15s] mx-0.5'></div>
            <div className='h-5 w-5 bg-red rounded-full animate-bounce mx-0.5'></div>
        </div>
    );
}

export default Dots;