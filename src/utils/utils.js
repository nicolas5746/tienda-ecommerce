// Function to copy text on right click
export const copyOnClick = (text, state) => {
    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(text)
            .then(() => {
                state(true);
                setTimeout(() => {
                    state(false);
                }, 3000);
            })
            .catch((err) => {
                console.error(`Error copying text: `, err);
            });
    }
}
// Function to scroll to the browser window top
export const scrollToTop = () => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    });
}