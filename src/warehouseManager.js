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
    capitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }
    generateNavMenu(active) {
        const elems = new Array('main', 'products', 'categories');
        this.renderElem("div", "navMenu", null, "mainContainer", null);
        for (let elem of elems) {
            let item = this.renderElem("button", `${elem}PageButton`, "navButton", "navMenu", this.capitalize(elem));
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
            this.renderElem("div", "storage", "dbContent", "contentContainer", null);
            const headerFields = new Array("Name", "Category", "Price", "In stock", "Description");
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
        else if (active === 'categories') {
            
        }
    }
    addItem(type) {
        this.openPopUp();
        this.renderElem("form", `add${type}`, "addItemForm", "popUpContainer", null);
        let inputType;
        if (type.toUpperCase() === "PRODUCT") {
            inputType = new Product();
        }
        else {
            inputType = new Category();
        }
        for (const index in inputType) {
            this.renderElem("label", `${index}Label`, null, `add${type}`, index).setAttribute("for", `${index}`);
            if (index != "categoryID") {   
                let elem = this.renderElem("input", `${index}`, "formInput", `add${type}`, null);
                elem.required = true;
                elem.setAttribute("type", "text");
            } else {
                let select = this.renderElem("select", `${index}`, null, `add${type}`, null);
                select.innerHTML += "<option disabled selected hidden value=-1>- Pick category -</option>";
                for (const obj in this.warehouse.Categories) {
                    select.innerHTML += `<option value=${obj}>${this.warehouse.Categories[obj].name}</option>`;   
                }
            }
        }
        if (type.toUpperCase() === "PRODUCT") {
            //document.getElementById("categoryID").setAttribute("type", "number");
            let howManyAvailable = document.getElementById("howManyAvailable");
            howManyAvailable.setAttribute("type", "number");
            howManyAvailable.setAttribute("min", "0");    
        }
        document.getElementById("description").required = false;
        let submitButton = this.renderElem("input", "submitButton", null, `add${type}`, null);
        submitButton.setAttribute("type", "submit");
        submitButton.value = "Add Item";
    }
 }