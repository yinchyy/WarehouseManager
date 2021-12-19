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
    addObj(obj) {
        for (let index of this.objects) {
            if (index.visitDate === obj.visitDate) {
                if(index.visitTime===obj.visitTime){
                    return false;  
                }   
            }
        }
        this.objects.push(obj);
        localStorage.setItem('warehouse', JSON.stringify(this.objects));
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