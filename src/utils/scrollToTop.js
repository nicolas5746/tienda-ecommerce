// Function to scroll to the browser window top
const scrollToTop = () => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    });
}

export default scrollToTop;