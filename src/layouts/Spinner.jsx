const Spinner = () => {

    return (
        <div className='overlay fixed flex items-center justify-center bg-squid-ink h-full w-full inset-0'>
            <div className='h-20 w-20 rounded-full border-8 border-snow border-t-squid-ink animate-spin'></div>
        </div>
    );
}

export default Spinner;