class warehouseManager extends elementToolsLib {
    constructor() {
        super();
        this.currentMonthDate = new Date();
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);
        this.selectedLanguage = 'en-US';
        this.currentMonthDate.setDate(1);
        this.visits = new dbManagement();
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
            
        }
    }
 }