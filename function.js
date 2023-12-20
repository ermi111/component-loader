
/**
 * Loads a component from the specified URL and appends it to the document body.
 * 
 * @param {string} URLPath - The URL path of the component to be loaded.
 * @param {string} appendon - The HTML tag to append the loaded component to.
 * @param {function} callback - Optional callback function to be executed after loading.
 *                               The callback receives the loaded component content or an error.
 */
export function componentLoader(URLPath, appendon, callback) {
    // Create a new XMLHttpRequest object
    const request = new XMLHttpRequest();
    request.open('GET', URLPath);

    request.onreadystatechange = function() {
        // Check if the request has been completed
        if (request.readyState === 4) {
            if (request.status === 200) {
                const componentContent = request.responseText;

                const newContainer = document.createElement(appendon);

                newContainer.innerHTML = componentContent;

                document.body.appendChild(newContainer.cloneNode(true));

                // Execute the callback function if provided and is a function
                if (callback && typeof callback === 'function') {
                    callback(componentContent);
                }
            } else {
                // Handle errors when the request is not successful
                const error = new Error(`Component loading failed with status code ${request.status}`);
                console.error(error);

                // Execute the callback function with the error if provided
                if (callback) {
                    callback(error);
                }
            }
        }
    };

    // Send the GET request
    request.send();
}
