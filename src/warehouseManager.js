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
        let headerFields,type,targetArr;
        this.clearContent();
        this.generateNavMenu(active);
        this.renderElem("div", "contentContainer", null, "mainContainer", null);
        if (active === 'products') {
            headerFields = new Array("Name", "Category", "Price", "In stock", "Description");
            type = 'Product';
            targetArr = this.warehouse.Products;
        }
        else if (active === 'categories') {
            headerFields = new Array("Name", "Description");
            type = 'Category';
            targetArr = this.warehouse.Categories;
            }
        if (active === 'products' || active === 'categories') {
            this.renderElem("div", "storage", "dbContent", "contentContainer", null);
            this.renderElem("div", "itemHeader", null, "storage", null);
            this.renderElem("div", "itemsContainer", null, "storage", null);
            
            for (const value of headerFields) {
                this.renderElem("p", `header${value}`, "headerItem", "itemHeader", value);
            }
            for (const value in targetArr[0]) {
                if (value.charAt(0) != '_')
                {
                    this.renderElem("div", `col${value}`, "itemColumn", "itemsContainer", null);   
                }
            }
            
            console.log(targetArr);
            for (const index in targetArr) {
                console.log(targetArr[index]);
                for (const value in targetArr[index]) {
                    if (value.charAt(0) != '_') {   
                        this.renderElem("div", `item${index}${value}`, "itemContent", `col${value}`, null);
                        this.renderElem("p", `i${index}${value}`, null, `item${index}${value}`, targetArr[index][value]);   
                    }
                }
                if (active === 'products') {
                    document.getElementById(`i${index}categoryID`).innerText = this.warehouse.Categories[this.warehouse.Products[index].categoryID].name;   
                }
            }
            this.renderElem("div", "buttonsContainer", null, "contentContainer", null);
            this.renderElem("button", "addItem", "managementButtons", "buttonsContainer", "Add Item").setAttribute("onclick",`w1.addItem('${type}')`);
            this.renderElem("button", "removeItem", "managementButtons", "buttonsContainer", "Remove Item").setAttribute("onclick",`w1.removeItems('${active}')`);
        }
    }
    addItem(type) {
        this.openPopUp();
        this.renderElem("form", `add${type}`, "addItemForm", "popUpContainer", null).setAttribute("onSubmit",`w1.sendForm('${type}'); return false;`);
        let inputType;
        if (type.toUpperCase() === "PRODUCT") {
            inputType = new Product();
        }
        else {
            inputType = new Category();
        }
        for (const index in inputType) {
            if (index.charAt(0) != '_') {
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
    sendForm(type) {
        if (type.toUpperCase() === "PRODUCT") {
            if (parseInt(document.getElementById("categoryID").value) === -1) {
                this.renderElem("p", "errorItem", null, `add${type}`, `Error: you need to choose category.
                If list is empty, go to Categories page and add one first.`);
            }
            else {
                this.warehouse.addObj(new Product(
                    document.getElementById("name").value,
                    document.getElementById("categoryID").value,
                    document.getElementById("value").value.replace(/,/g,"."),
                    document.getElementById("howManyAvailable").value,
                    document.getElementById("description").value
                ), type);
                this.generatePage('products');
                elementToolsLib.closePopUp();
            }
        }
        else if (type.toUpperCase() === "CATEGORY") {
            this.warehouse.addObj(new Category(document.getElementById("name").value,document.getElementById("description").value), type);
            this.generatePage('categories');
            elementToolsLib.closePopUp();
        }
    }
    removeItems(active) {
        
        if (!document.getElementById("headerRemove")) {
            let targetArr;
            let header = document.getElementById("itemHeader");
            let content = document.getElementById("itemsContainer");
            let rHeader = document.createElement("p");
            let rContent = document.createElement("div");
            rHeader.id = "headerRemove";
            rHeader.className = "headerItem";
            rHeader.innerText += "(x)";
            rContent.id = "colRemove";
            rContent.className = "itemColumn";
            if (active === 'products') {
                targetArr = this.warehouse.Products;
            } else if (active === 'categories') {
                targetArr = this.warehouse.Categories;
            }
            header.insertBefore(rHeader, header.childNodes[0]);
            content.insertBefore(rContent, content.childNodes[0]);
            for (const index in targetArr) {
                rContent.innerHTML += `<div class='itemContent'><input type='checkbox' value='${index}' class='checkRemove'/></div>`;
            }   
        }
        else{
            let checkboxes = document.querySelectorAll(".checkRemove");
            let toRemove = new Array();
            for (const elem of checkboxes) {
                if (elem.checked) {
                    toRemove.push(elem.value);
                }
            }
            if (active === 'products') {
                this.warehouse.removeObj(toRemove, 'product');   
            }
            else if (active === 'categories') {
                this.warehouse.removeObj(toRemove, 'category');
            }
            this.generatePage(active);
        }
    }
}