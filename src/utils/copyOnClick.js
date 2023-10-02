// Function to copy text on right click
const copyOnClick = (text, state) => {
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

export default copyOnClick;