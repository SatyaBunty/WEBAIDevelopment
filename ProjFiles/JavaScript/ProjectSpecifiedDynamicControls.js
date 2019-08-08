function AddDynamicNumericalURLFields(startIndexAttributes, endIndexAttributes, hasZeroAttributes, fixedURLAttributes)
{
    var formChildDiv = document.createElement("div");
    var formChildChildDiv = document.createElement("div");

    formChildChildDiv.appendChild(AddTextField(startIndexAttributes, "Start Index", true));
    formChildChildDiv.appendChild(AddTextField(endIndexAttributes, "End Index", true));
    formChildChildDiv.appendChild(AddSelectDropDown(hasZeroAttributes, ["yes", "no"], "Add zero for single digit numbers", true));
    
    formChildDiv.appendChild(formChildChildDiv);
    formChildDiv.appendChild(AddTextField(fixedURLAttributes, "Fixed URL extra part", true));
    
    return formChildDiv;
}