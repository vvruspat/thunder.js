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
     * 
     * @param {string} template
     * @returns {undefined}
     */
    parse (template) {
        
//        var parser = new DOMParser(),
//            doc = parser.parseFromString(template, "text/html");
//    
//    console.log("Doc", doc);
        
        template.replace(/\{\{([a-zA-Z0-9\_]*)\s?\|?\s?([a-zA-Z0-9\_]*?)\}\}/g, this.replaceVariable.bind(this));
        template.replace(/\<(\S+)[\s\S]*\s+((\S+)="(\S+)")+\s*\/\>/g, this.replaceBlock.bind(this));

    }
    
    /**
     * 
     * @param {type} tmpl
     * @param {type} variable
     * @param {type} filters
     * @returns {undefined}
     */
    replaceVariable (tmpl, variable, ...filters) {
        console.log("Variable", tmpl, variable, filters);
    }
    
    replaceBlock(tmpl, variable, ...filters) {
        console.log("Block: ", tmpl, variable, filters);
    }
    
}