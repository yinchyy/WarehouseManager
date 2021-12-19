class elementToolsLib {
    initiateMainContainer() {
        if (!document.getElementById("mainContainer")) {
            let tmp = document.createElement("div");
            tmp.setAttribute("id", "mainContainer");
            document.body.appendChild(tmp);
        }
    }
    renderElem(elementTag, id, className, elementParentID, elementContent) {
        if (!document.getElementById(id)) {
            const element = document.createElement(elementTag);
            if (id) element.setAttribute('id', id);
            if (className) element.setAttribute('class', className);
            document.getElementById(elementParentID).appendChild(element);
        }
        if (id && elementContent) document.getElementById(id).innerText = elementContent;
        return document.getElementById(id);
    }
    openPopUp() {
        if (!document.getElementById("popUpWindow")) {
            let tmp = document.createElement("div");
            tmp.setAttribute("id", "popUpWindow");
            document.body.appendChild(tmp);
            this.renderElem("div", "popUpContainer", "popUpContainer", "popUpWindow", null);
            this.renderElem("button", "closePopUpButton", null, "popUpContainer", "X");
            document.getElementById("closePopUpButton").setAttribute("onclick", "elementToolsLib.closePopUp();");
        }
    }
    static closePopUp() {
        document.getElementById("popUpWindow").remove();
    }
}