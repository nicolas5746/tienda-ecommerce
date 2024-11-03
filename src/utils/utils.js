// Copy text on right click
export const copyOnClick = (copy, state) => {
    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(copy)
            .then(() => {
                state(true);
                setTimeout(() => state(false), 3000);
            })
            .catch((error) => {
                console.error(`Error copying text: `, error);
            });
    }
}
// Close window when clicking on background or pressing down 'Esc' key
export const closeOnEvent = (event, condition, ref, callback) => {
    const { code } = event;
    if ((code === 'Escape' && condition) || (ref.current && !ref.current.contains(event.target))) callback();
}
// Check if element referenced is in view
export const isInView = (ref, callback) => {
    if (!ref.current) {
        return;
    } else {
        const rect = ref.current?.getBoundingClientRect();
        const { bottom, left, right, top } = rect;
        const { clientHeight, clientWidth } = document.documentElement;
        const { innerHeight, innerWidth } = window;
        const visible = top >= 0 && left >= 0 && bottom <= (innerHeight || clientHeight) && right <= (innerWidth || clientWidth);
        if (ref.current && visible) callback();
    }
}
// Scroll to the top of window  
export const scrollToTop = () => window.scroll({ behavior: 'smooth', left: 0, top: 0 });