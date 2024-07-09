// Function to copy text on right click
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
// Function to close window when clicking on background or pressing down 'Esc' key
export const closeOnEvent = (event, condition, ref, callback) => {
    const { code } = event;
    if ((code === 'Escape' && condition) || (ref.current && !ref.current.contains(event.target))) callback();
}
// Function to scroll to the browser window top
export const scrollToTop = () => {
    window.scroll({ behavior: 'smooth', left: 0, top: 0 });
}