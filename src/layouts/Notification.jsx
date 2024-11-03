import React from 'react';
import { CartContext } from '@/contexts/Contexts';
import { Button } from '@ui/Buttons';
import Spacer from '@ui/Spacer';

const Notification = () => {
    // States
    const [hover, setHover] = React.useState({ accept: false, decline: false });
    // Context
    const { message, notification, resetNotification } = React.useContext(CartContext);
    // Close notification when pressing 'Esc' key
    const handleCloseOnEvent = React.useCallback((event) => {
        const { code } = event;
        if (code === 'Escape') resetNotification();
    }, [resetNotification]);
    // Save to cart context
    React.useEffect(() => {
        if (notification.show) {
            document.addEventListener('keydown', handleCloseOnEvent);
            return () => document.removeEventListener('keydown', handleCloseOnEvent);
        } else {
            setHover({ accept: false, decline: false });
        }
    }, [handleCloseOnEvent, notification.show]);

    return (
        <>
            {notification.show &&
                <div className='fixed bg-transparent-darkest inset-0 h-full w-full' style={{ zIndex: '5' }}>
                    <div className='absolute flex flex-col items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <p className='text-center text-3lg text-white font-semibold first-letter:uppercase font-lato w-[90vw]'>{message}</p>
                        <Spacer value={2} />
                        <div className={`relative flex items-center justify-center ${notification.declinable && 'flex-row'}`}>
                            <Button
                                onClick={() => notification.accept()}
                                onMouseEnter={() => setHover({ accept: true, decline: false })}
                                onMouseLeave={() => setHover({ accept: false, decline: false })}
                                style={{
                                    color: '#dcdcdc',
                                    backgroundColor: hover.accept ? '#357ec7' : '#0054a9',
                                    border: '0.1em solid #dcdcdc',
                                    borderRadius: '0.5em',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    marginRight: notification.declinable ? '5%' : '0',
                                    padding: notification.declinable ? '5%' : '15%',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                }}
                                text='aceptar'
                                title='Aceptar'
                            />
                            {notification.declinable &&
                                <Button
                                    onClick={() => notification.decline()}
                                    onMouseEnter={() => setHover({ accept: false, decline: true })}
                                    onMouseLeave={() => setHover({ accept: false, decline: false })}
                                    style={{
                                        color: '#dcdcdc',
                                        backgroundColor: hover.decline ? '#357ec7' : '#0054a9',
                                        border: '0.1em solid #dcdcdc',
                                        borderRadius: '0.5em',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        marginLeft: '5%',
                                        padding: '5%',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                    }}
                                    text='cancelar'
                                    title='Cancelar'
                                />}
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default Notification;