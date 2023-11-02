import { HomeButton } from '@ui/buttons/Buttons';
import './notFound.sass';

const NotFound = () => {

    return (
        <div className='notFound'>
            <p>{`error`}</p>
            <h1>{`404`}</h1>
            <p>{`página no encontrada`}</p>
            <HomeButton
                style={{
                    borderRadius: '0.3em',
                    padding: '3%',
                    width: '120%'
                }}
                text={'volver'}
            />
        </div>
    );
}

export default NotFound;