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
    generateNavMenu() {
        this.renderElem("div", "navMenu", null, "mainContainer", null);
        this.renderElem("button", "mainPageButton", "navButton", "navMenu", "Main page");   
        this.renderElem("button", "productsPageButton", "navButton", "navMenu", "Manage products");   
        this.renderElem("button", "categoriesPageButton", "navButton", "navMenu", "Manage categories");   
    }
    generateMainPage() {
        this.generateNavMenu();
        document.getElementById("mainPageButton").setAttribute("class", "activePageButton");
        this.renderElem("div", "contentContainer", null, "mainContainer", null);
    }
 }