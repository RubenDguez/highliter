/**
 * Highlight
 * @param {string} xpath
 * @param {{color: 'green' | 'yellow' | 'red'}} options 
 * @return {Promise<void>}
 * @description Highlight an element on the page
 * @example await highlight('.//*[text()="Login Page"]', {color: 'green'});
 */
async function highlight(xpath, options) {
    const getColor = (color) => {
        switch (color) {
            case 'green': return '#bef264';
            case 'yellow': return '#fcd34d';
            case 'red': return '#fca5a5';
            default: 
                const error = new Error();
                error.name = 'Highlighter Color Error'
                error.message = 'Invalid color. Please use one of the following: green, yellow, red';
                throw error;
        }
    }

    const color = options.color || 'green';
    const style = `border: 1px dotted gray; border-radius: 4px; padding: 4px 2px; background-color: ${getColor(color)};`

    await browser.execute((xpath, style) => {
        const element = document.evaluate(xpath, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        element.setAttribute('style', style);
    }, xpath, style);
}

module.exports = highlight;
