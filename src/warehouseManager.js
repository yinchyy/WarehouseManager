class warehouseManager extends elementToolsLib {
    constructor() {
        super();
        this.warehouse = new dbManagement();
        this.initiateMainContainer();
    }
    clearContent() {
        if (document.getElementById("contentContainer")) {
            document.getElementById("contentContainer").remove();
        }
    }
    generateNavMenu(active) {
        const elems = new Array('main', 'products', 'categories');
        this.renderElem("div", "navMenu", null, "mainContainer", null);
        for (let elem of elems) {
            let item = this.renderElem("button", `${elem}PageButton`, "navButton", "navMenu", `${elem.charAt(0).toUpperCase()}${elem.slice(1)}`);
            item.setAttribute("onclick", `w1.generatePage('${elem}')`);
            item.setAttribute("class", "navButton");
        }
        document.getElementById(active+'PageButton').setAttribute("class", "activePageButton");
    }
    generatePage(active) {
        this.clearContent();
        this.generateNavMenu(active);
        this.renderElem("div", "contentContainer", null, "mainContainer", null);
        if (active === 'products') {
            const headerFields = new Array("Name", "Category", "Price", "In stock", "Description");
            this.renderElem("div", "storage", "dbContent", "contentContainer", null);
            this.renderElem("div", "buttonsContainer", null, "contentContainer", null);
            this.renderElem("button", "addItem", "managementButtons", "buttonsContainer", "Add Item").setAttribute("onclick","w1.addItem('Product')");
            this.renderElem("button", "removeItem", "managementButtons", "buttonsContainer", "Remove Item");
            this.renderElem("div", "itemHeader", null, "storage", null);
            this.renderElem("div", "itemsContainer", null, "storage", null);

            for (const value of headerFields) {
                this.renderElem("p", `header${value}`, "headerItem", "itemHeader", value);
            }

            console.log(this.warehouse.Products);
            for (const index in this.warehouse.Products) {
                this.renderElem("div", `item${index}`, "itemContent", "itemsContainer", null);
                console.log(this.warehouse.Products[index]);
                for (const value in this.warehouse.Products[index]) {
                    this.renderElem("p", `i${index}${value}`, null, `item${index}`, this.warehouse.Products[index][value]);   
                }
                document.getElementById(`i${index}categoryID`).innerText = this.warehouse.Categories[this.warehouse.Products[index].categoryID].name;
            }
        }
    }
    addItem(type) {
        this.openPopUp();
        this.renderElem("form", `add${type}`, null, "popUpContainer", null);
    }
 }