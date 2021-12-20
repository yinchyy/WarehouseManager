class dbManagement{
    constructor() {
        this.Products = new Array();
        this.Categories = new Array();
        if ('warehouseProducts' in localStorage) {
            this.Products = JSON.parse(localStorage.getItem('warehouseProducts'));
        }
        if ('warehouseCategories' in localStorage) {
            this.Categories = JSON.parse(localStorage.getItem('warehouseCategories'));
        }
    }
    editData(obj) {
        for (const key in obj) {
            this.object[key] = obj[key];
        }
    }
    addObj(obj,type) {
        if (type.toUpperCase() === 'PRODUCT') {
            this.Products.push(obj);
            this.Categories[obj['categoryID']]['_createdProducts']++;
            localStorage.setItem('warehouseProducts', JSON.stringify(this.Products));   
        }
        else if(type.toUpperCase() === 'CATEGORY') {
            this.Categories.push(obj);
            localStorage.setItem('warehouseCategories', JSON.stringify(this.Categories));   
        }
        return true;
    }
    getObjectsMatchingParameterValue(parameter, value) {
        let matchingObjects = new Array();
        for (let index of this.objects) {
            if (index[parameter] === value) {
                matchingObjects.push(index);
            }
        }
        return matchingObjects;
    }
}