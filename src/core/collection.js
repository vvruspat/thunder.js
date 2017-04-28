class Collection extends Base {

    /**
     * Models to collect
     * @param ModelType Model
     */
    constructor(ModelType) {
        super();

        this.type = ModelType || Model;
        this.isCollectionModified = false;
        this.models = [];
    }

    /**
     *
     * @param items Model[]
     */
    set items(items) {
        items.forEach((key, item) => {
            item.on('model.modified', this.onModelModified.bind(this));
        });
        this.models = items;
    }

    /**
     *
     * @returns Model[]
     */
    get items() {
        return this.models;
    }

    /**
     * Adding item to collection
     * @param item
     */
    addItem(item) {
        item.on('model.modified', this.onModelModified.bind(this));
        this.models.push(item);
        this.isCollectionModified = true;
    }

    /**
     * Remove item from collection
     * @param item Model
     */
    removeItem(item) {
        this.models.forEach((key, model) => {
            if (model.hash === item.hash) {
                model.destroy();
                this.models.splice(key, 1);
            }
        });
    }

    /**
     * Set service to provide save and fetch functions.
     * Service must have follow methods:
     * post - for save collection
     * get - for fetch collection
     * @param service Service
     */
    setService(service) {
        this.service = service;
    }

    /**
     * Is collection modified
     * @returns {boolean}
     */
    isModified() {
        return this.isCollectionModified;
    }

    /**
     * Load data to collection from server
     */
    fetch() {
        this.service.get().then(this.onFetched.bind(this));
    }

    /**
     * Save collection
     */
    save() {
        this.service.post().then(this.onSaved.bind(this));
    }

    onFetched(data) {
        this.items = data;
        this.trigger('collection.fetched', this.items);
        this.isCollectionModified = false;
    }

    onSaved() {
        this.trigger('collection.saved', this.items);
        this.isCollectionModified = false;
    }

    onModelModified() {
        this.isCollectionModified = true;
    }

}