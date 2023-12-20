
/**
 * ComponentLoader is a utility class for loading and appending components to the DOM.
 */
export class ComponentLoader {
    /**
     * Creates an instance of the ComponentLoader.
     * 
     * @param {string} URLPath - The URL path of the component to be loaded.
     * @param {string} appendon - The HTML tag to append the loaded component to.
     * @param {function} callback - Optional callback function to be executed after loading.
     *                               The callback receives the loaded component content or an error.
     */
    constructor(URLPath, appendon, callback) {
        this.URLPath = URLPath;
        this.appendon = appendon;
        this.callback = callback;

        // Create a new XMLHttpRequest object
        this.request = new XMLHttpRequest();
        this.request.open('GET', this.URLPath);

        // Initialize the ComponentLoader instance
        this.#init();
    }

    /**
     * Initializes the ComponentLoader by setting up the XMLHttpRequest and handling the response.
     * Private method (denoted by the # prefix).
     */
    #init() {
        this.request.onreadystatechange = () => {

            if (this.request.readyState === 4) {
                if (this.request.status === 200) {
                    const componentContent = this.request.responseText;

                    const newContainer = document.createElement(this.appendon);
                    newContainer.innerHTML = componentContent;

                    const body = document.querySelector('body');
                    body.appendChild(newContainer.cloneNode(true));

                    if (this.callback && typeof this.callback === 'function') {
                        this.callback(componentContent);
                    }
                } else {
                    // Handle errors when the request is not successful
                    const error = new Error(`Component loading failed with status code ${this.request.status}`);
                    console.error(error);

                    if (this.callback) {
                        this.callback(error);
                    }
                }
            }
        };

        // Send the GET request
        this.request.send();
    }

    /**
     * Returns the container element based on the specified appendon.
     * If the appendon is provided, it looks for an element with the specified class.
     * 
     * @returns {HTMLElement|null} - The container element or null if not found.
     */
    getContainer() {
        if (this.appendon) {
            // Query for an element with the specified class within the appendon
            return document.querySelector(`.${this.appendon}`);
        }
        return null;
    }
}

