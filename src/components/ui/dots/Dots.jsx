import './dots.sass';

const Dots = () => {

    return (
        <div className='dots'>
            {Array.from({ length: 4 }, (_, index) => <div key={index}></div>)}
        </div>
    );
}

export default Dots;