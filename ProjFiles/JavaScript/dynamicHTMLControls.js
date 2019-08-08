function AddTextField(fieldName, captionText, addCaption)
{
    var formChildDiv = document.createElement("div");

    var inputEntryField = document.createElement("input");
    inputEntryField.type = "text";
    inputEntryField.name = fieldName;

    if(addCaption === true)
    {
        if(captionText === null || captionText === "")
        {
            captionText = fieldName;
        }

        formChildDiv.appendChild(document.createTextNode(captionText));
        formChildDiv.appendChild(inputEntryField);
        formChildDiv.appendChild(document.createElement("br"));
    }
    else
    {
        formChildDiv.appendChild(inputEntryField);
    }
    return formChildDiv;
}

function AddSubmitButton(fieldName, isSubmitButton)
{
    var formChildDiv = document.createElement("div");

    var inputButton = document.createElement("input");
    inputButton.type = "submit";
    inputButton.name = fieldName;

    if(isSubmitButton === true)
    {
        inputButton.value = "Submit";
    }
    else
    {
        return inputButton;
    }
    formChildDiv.appendChild(inputButton);
    return formChildDiv;
}

// function AddClickableText(fieldName, clickEvent)
// {
//     var formChildDiv = document.createElement("div");
//     var inputButton = document.createElement("p");
//     inputButton.text = fieldName;
//     // inputButton.onclick = OnAddRemoveButtonClicked(inputButton);
//     inputButton.setAttribute('onclick',"OnAddRemoveButtonClicked("+inputButton+")");
//     // if(isSubmitButton === true)
//     // {
//     //     inputButton.value = "Submit";
//     // }
//     // else
//     // {
//     //     return inputButton;
//     // }
//     formChildDiv.appendChild(inputButton);
//     return formChildDiv;
// }

function AddSelectDropDown(fieldName, dropDownValues, captionText, addCaption)
{
    var formChildDiv = document.createElement("div");

    var selectDropDown = document.createElement("select");
    selectDropDown.name = fieldName;
    // selectDropDown.options[selectOptions.length] = new Option('', 'Text 1', 'Value1');
    for (i = 0; i < dropDownValues.length; i++) 
    {
        var selectOptions = document.createElement("option");
        selectOptions.value = dropDownValues[i];
        selectOptions.text = dropDownValues[i];
        selectDropDown.appendChild(selectOptions);
    }
    // return selectDropDown;
    if(addCaption === true)
    {
        if(captionText === null || captionText === "")
        {
            captionText = fieldName;
        }

        formChildDiv.appendChild(document.createTextNode(captionText));
        formChildDiv.appendChild(selectDropDown);
        formChildDiv.appendChild(document.createElement("br"));
    }
    else
    {
        formChildDiv.appendChild(selectDropDown);
    }
    return formChildDiv;
}

function nullValueCheck(_obtainedValue)
{
    var obtainedValue="";
    if(_obtainedValue !== null)
    {
        obtainedValue = _obtainedValue;
    }
    return obtainedValue;
}