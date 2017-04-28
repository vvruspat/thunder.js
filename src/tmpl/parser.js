class TParser {
    
    /**
     * 
     * @param {type} template_url
     * @returns {TParser}
     */
    constructor (template_url) {
        let loader = new Service();
        // Loading template
        loader.get(template_url).then(function (data) {
            // Success
            this.parse(data);
        }.bind(this), function (data) {
            // Error
            throw new Error('Can\'t load template "'+template_url+'"', data);
        });
    }
    /**
     * Parsing template
     * @param {string} template
     * @returns {undefined}
     */
    parse (template) {
        // Search variables
        template.replace(/\{\{([a-zA-Z0-9\_]*)\s?\|?\s?([a-zA-Z0-9\_]*?)\}\}/g, this.replaceVariable.bind(this));
        // Search blocks
        template.replace(/\<(\S+)[^(\/\>)]*\/\>/g, this.replaceBlock.bind(this));
    }
    
    /**
     * Replace variables
     * @param {type} tmpl
     * @param {type} variable
     * @param {type} filters
     * @returns {undefined}
     */
    replaceVariable (tmpl, variable, ...filters) {
        console.log("Variable", tmpl, variable, filters);
    }

    /**
     * Parse blocks, and replace it
     * @param {string} tmpl
     * @param {Array} variable
     * @param {Array} filters
     */
    replaceBlock(tmpl, variable, ...filters) {
        let attributesStrings = tmpl.match(/((\S+)="(\S+)")/ig),
            attributes = {};

        attributesStrings.forEach((attr) => {
            let attribute = attr.match(/(\S+)="(\S+)"/);

            attributes[attribute[1]] = attribute[2];
        });

        console.log("Block: ", tmpl, variable, filters, "Attr", attributes);
    }
    
}