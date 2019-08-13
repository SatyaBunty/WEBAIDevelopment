// import { AddTextField, AddSubmitButton, AddSelectDropDown } from "./dynamicHTMLControls.js"
// import { AddTextField } from "./dynamicHTMLControls.js";
// import { AddSubmitButton } from "./dynamicHTMLControls.js";
// import { AddSelectDropDown } from "./dynamicHTMLControls.js";
// import AddTextField from './dynamicHTMLControls.js';
// import AddSubmitButton from './dynamicHTMLControls.js';
// import AddSelectDropDown from './dynamicHTMLControls.js';
// import * as customControl from './dynamicHTMLControls';
// var controls = require('./dynamicHTMLControls.js');

function OnLoadorStartup()
{
    var dynamicHTMLControls = document.createElement('script');
    dynamicHTMLControls.src = './ProjFiles/JavaScript/dynamicHTMLControls.js';
    document.head.appendChild(dynamicHTMLControls);

    var ProjectSpecifiedDynamicControls = document.createElement('script');
    ProjectSpecifiedDynamicControls.src = './ProjFiles/JavaScript/ProjectSpecifiedDynamicControls.js';
    document.head.appendChild(ProjectSpecifiedDynamicControls);
}
OnLoadorStartup();

var urlStartPartName = "url";
var urlEndPartName = "endPointOfURL";
var urlChangingIndexPartChildren = 0;

function GetLinksData(strData, regexExp)
{
    var myArray = strData.match(regexExp);
    var keyValues = new Map();
    // data="";
    for(var i = 0; i < myArray.length; i++)
    {
        //   data += myArray[i] + "\n" ;
        var keyVals = myArray[i].split('=');
        var vals = keyVals[1].substring(1, (keyVals[1].length-2));
        keyValues.set(keyVals[0], vals);
    }
    // alert(data);
    return keyValues;
}

function UpdateForm()
{
    var selectedOption = document.getElementById("URLOptions").value;
    var formData = document.createElement("form");
    formData.setAttribute('method',"post");
    formData.setAttribute('action',"");
    
    formData.appendChild(AddSelectDropDown("imageTypes", ["jpg", "gif"], "Set image Type", true));
    formData.appendChild(AddTextField(urlStartPartName, "Add URl", true));
    if(selectedOption === "I have a URL")
    {
        formData.setAttribute('name',"singleURLForm");
        formData.setAttribute('onsubmit',"AccessSingleURLData(); return false;");

        formData.appendChild(AddDynamicNumericalURLFields("startIndex", "endIndex", "HasZero", "fixedURLEndPoint"));
    }
    else if(selectedOption === "Get Dynamic Data From Following URL")
    {
        var regexMatch = /([^\t\n\f \/>""'=]+)(?:=)('.*?'|"".*?"")(?:\s|\/>|\>)/gi;///d(b+)d/g
        var stringCheck = "<img alt='avatar' class='js-avatar' src='https://www.pexels.com/assets/_svg/avatar_default-ab90ed807baa930476cb5abc4b547f7190f19fb418dc3581e686d5d418a611a1.svg'>";//"cdbbdbsbz"
        GetLinksData(stringCheck, regexMatch);
      formData.setAttribute('name',"singleURLForm");
      formData.setAttribute('onsubmit',"AccessDynamicURLData(); return false;");
      // formData.setAttribute('onsubmit',"AccessDynamicURLDataFrame(); return false;");
    }
    else if(selectedOption === "XX/YY/10XXYY model")
    {
      formData.setAttribute('name',"singleURLForm");
      formData.setAttribute('onsubmit',"AccessXXYY10XXYYmodelData(); return false;");

      formData.appendChild(AddDynamicNumericalURLFields("startIndex", "endIndex", "HasZero", "fixedURLEndPoint"));
    }
    // else if(selectedOption === "x--_y-- model")
    // {
    //   formData.setAttribute('name',"singleURLForm");
    //   formData.setAttribute('onsubmit',"Accessx_ymodelmodelData(); return false;");
    //   formData.appendChild(AddDynamicNumericalURLFields("startIndex", "endIndex", "HasZero", "fixedURLEndPoint"));
    // }
    else if(selectedOption === "I have a URL with multiple increment values")
    {
        var formAddRemoveDiv = document.createElement("div");
        formData.setAttribute('name',"multipleIncrementURLForm");
        formData.setAttribute('onsubmit',"AccessMultipleURLData(); return false;");

        // formAddRemoveDiv.appendChild(AddClickableText("+"));
        // formAddRemoveDiv.appendChild(AddClickableText("-"));
        formAddRemoveDiv.innerHTML = "<p onclick=\"OnAddRemoveButtonClicked(\'+\');\">+</p>"+"<p onclick=\"OnAddRemoveButtonClicked(\'-\');\">-</p>";
        

        var formExtraEntriesDiv = document.createElement("div");
        // formExtraEntriesDiv.id = "extraEntriesDiv";
        formExtraEntriesDiv.setAttribute('id',"extraEntriesDiv");

        formData.appendChild(formExtraEntriesDiv);
        formData.appendChild(formAddRemoveDiv);
    }
    else{}
    formData.appendChild(AddTextField(urlEndPartName, "Enter if have extra end point", true));
    formData.appendChild(AddSubmitButton("Submit", true));

    var formDiv = document.getElementById("formDiv");
    while (formDiv.hasChildNodes()) {
        formDiv.removeChild(formDiv.lastChild);
    }
    formDiv.appendChild(formData);
}

function OnAddRemoveButtonClicked(owner)
{
    var extraEntriesHolder = document.getElementById("extraEntriesDiv");
    if(owner === "+")
    {
        urlChangingIndexPartChildren = extraEntriesHolder.childElementCount + 1;
        // extraEntriesHolder.appendChild(AddTextField("extra url", "Add extra URl", true));
        extraEntriesHolder.appendChild(AddDynamicNumericalURLFields("startIndex"+urlChangingIndexPartChildren, "endIndex"+urlChangingIndexPartChildren, "HasZero"+urlChangingIndexPartChildren, "fixedURLEndPoint"+urlChangingIndexPartChildren));
    }
    else if(owner === "-")
    {
        if(extraEntriesHolder.childElementCount > 0)
        {
            extraEntriesHolder.removeChild(extraEntriesHolder.lastChild);
        }
        urlChangingIndexPartChildren = extraEntriesHolder.childElementCount;
    }
    else
    {
        alert("reached else part of the code");
    }
}

function AccessSingleURLData()
{
    var urls="";
    var imageType = document.forms["singleURLForm"]["imageTypes"].value;
    var x1 = document.forms["singleURLForm"][urlStartPartName].value;
    urls=x1;
    var x2 = document.forms["singleURLForm"]["startIndex"].value;
    var x3 = document.forms["singleURLForm"]["endIndex"].value;
    var x4 = document.forms["singleURLForm"]["HasZero"].value;
    var x5 = nullValueCheck(document.forms["singleURLForm"]["fixedURLEndPoint"].value);
    var x6 = nullValueCheck(document.forms["singleURLForm"][urlEndPartName].value);
    var data="";
    var changablePartString="";
    for(var i= x2; i<=x3; i++)
    {
        var changablePart = i;
        if(x4 == "yes")
        {
            if(i<10)
            {
                changablePart = "0"+i;
            }
            // console.log(changablePart);
        }
        changablePartString = urls+changablePart+x5+x6+"."+imageType;
        data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+changablePartString+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+changablePartString+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        // console.log(changablePartString);
    }
    var y=document.getElementById("dataDisplayDiv");
    y.innerHTML = data;
}

function GetSeperateTags(htmlData)
{
    var individualTags = htmlData.split('>');
    var listConversionString = "{\"data\":[";
    for(var i = 0; i < individualTags.length; i++ )
    {
        var item = individualTags[i];
        if(item.toLowerCase().includes("img") || item.toLowerCase().includes("image"))
        {
            if(item.toLowerCase().includes("src"))
            {
                // var _item = (item.includes("\"")) ? item.replace("\"", "\\\"") : item;
                // _item = (_item.includes("\n")) ? _item.replace("\n", "") : _item;
                // listConversionString += "{\"Name\":\"" + _item + ">\" },";

                // var _item = (item.includes("\"")) ? item.replace("\"", "\\\'") : item;
                // _item = (_item.includes("\n")) ? _item.replace("\n", "") : _item;
                // listConversionString += "{\"Name\":\"" + _item + ">\" },";

                var _item = (item.includes("\"")) ? item.replace(/"/g, "\'") : item;
                // var _item = (item.includes("\"")) ? item.replace(/"/g, "\"") : item;
                _item = (_item.includes("\n")) ? _item.replace(/\n/g, "") : _item;
                listConversionString += "{\"Name\":\"" + _item + ">\" },";
            }
        }
    }
    listConversionString = listConversionString.slice(0, listConversionString.length - 1);
    listConversionString += "]}";
    //console.log(listConversionString);

    var jsonStringData = JSON.parse(listConversionString);
    
    var regexMatch = /([^\t\n\f \/>""'=]+)(?:=)('.*?'|"".*?"")(?:\s|\/>|\>)/gi;///d(b+)d/g

    var tagSet = new Set();
    var data = "";
    var y=document.getElementById("dataDisplayDiv");
    // y.innerHTML = data;
    for(var i = 0; i < jsonStringData.data.length; i++)
    {
        var item = jsonStringData.data[i];

        // var attrs = GetLinksData(item.Name, regexMatch);
        // for(var j = 0; j < attrs.length; j++)
        // {
        //     var attr = attrs[j];
        //     tagSet.add(attr);
        // }

        if(item.Name.includes("src"))
        {
            var myArray = item.Name.match(regexMatch);
            for(var i = 0; i < myArray.length; i++)
            {
                //   data += myArray[i] + "\n" ;
                var keyVals = myArray[i].split('=');
                var vals = keyVals[1].substring(1, (keyVals[1].length-2));
                data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+vals+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+vals+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
                // y.innerHTML += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+vals+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+vals+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
            }
        }
    }
    y.innerHTML = data;
}

function AccessDynamicURLData()
{
  var imageType = document.forms["singleURLForm"]["imageTypes"].value;
  var mainURL = document.forms["singleURLForm"][urlStartPartName].value;//"https://www.pexels.com/search/beauty/";
  var proxyURLJS = "https://cors-anywhere.herokuapp.com/";
  var proxyURLPHP = "./ProjFiles/PHPServices/PHPCORSByPass.php";
  var x6 = nullValueCheck(document.forms["singleURLForm"][urlEndPartName].value);
  
  AccessDynamicURLDataFrame(mainURL);
  //AccessDynamicURL(mainURL, proxyURLJS, "GET", "JS");
  //AccessDynamicURLData(mainURL, proxyURLPHP, "POST", "PHP");
}

function AccessDynamicURLDataFrame(mainURL)
{
  var webFrame = "<iframe id=\"dataDisplayFrame\" src=\"" + mainURL + "\" style=\" margin:auto; height: 400px; width : 100%; padding: 0;\"></iframe>";
  // var y=document.getElementById("dataDisplayFrame");
  // y.src = mainURL;
  var y=document.getElementById("dataDisplayDiv");
  y.innerHTML = webFrame;
}

function AccessDynamicURL(dataUrl, proxyURL, methodName, fromName)
{   
  var xobj = new XMLHttpRequest();
  var obj = { "webURL":dataUrl };
  dbParam = JSON.stringify(obj);
  var xobj = new XMLHttpRequest();
  xobj.onreadystatechange = function ()
  {
    if (xobj.readyState == 4 && xobj.status == 200)
    {
        var data="";
        var responseData = xobj.response;
        if(responseData.includes("URLDetails"))
        {
            var responseJSONData = JSON.parse(xobj.response);
            if(data.code === 1)
            {
                data += responseData.URLDetails;
                // var datas = GetSeperateTags(data);
            }
        }
        else
        {
            data += responseData
        }
        console.log(data);
        var datas = GetSeperateTags(data);
    }
    };
    if(fromName === "PHP")
    {
        xobj.open(methodName, proxyURL, true);
        xobj.setRequestHeader("Content-type", "application/json");
    }
    else
    {
        xobj.open(methodName, proxyURL+dataUrl, true);
        xobj.setRequestHeader("Content-type", "application/json");
    }
    if(methodName === "POST")
    {
        xobj.send(dbParam);
    }
    else if(methodName === "GET")
    {
        xobj.send();
    }
    else
    {}
}

/*
function AccessDynamicURLDataPHP()
{
  var urls="";
  var imageType = document.forms["singleURLForm"]["imageTypes"].value;
  var x1 = document.forms["singleURLForm"][urlStartPartName].value;
  x1 = "https://www.pexels.com/search/beauty/";
  urls=x1;
  var x6 = nullValueCheck(document.forms["singleURLForm"][urlEndPartName].value);

  var xobj = new XMLHttpRequest();
  var obj = { "webURL":urls };
  dbParam = JSON.stringify(obj);
  var xobj = new XMLHttpRequest();
  xobj.onreadystatechange = function ()
  {
    if (xobj.readyState == 4 && xobj.status == 200)
    {
        var data="";
        var responseData = JSON.parse(xobj.response);
        if(data.code === 1)
        {
            data += responseData.URLDetails;
            // console.log(data);
            var datas = GetSeperateTags(data);
            // var y=document.getElementById("dataDisplayDiv");
            // y.innerHTML = data;
            // alert(responseData);
        }
        else
        {
        }
    }
    };
    xobj.open("POST", "./ProjFiles/PHPServices/PHPCORSByPass.php", true);
    xobj.setRequestHeader("Content-type", "application/json");
    xobj.send(dbParam);
}

function AccessDynamicURLDataJS()
{
  var urls="";
  var imageType = document.forms["singleURLForm"]["imageTypes"].value;
  var x1 = document.forms["singleURLForm"][urlStartPartName].value;
  x1 = "https://www.pexels.com/search/beauty/";
  urls=x1;
  var proxyUrl = "https://cors-anywhere.herokuapp.com/"+ x1;
  //"http://anyorigin.com/get?url=" + x1 + "&callback=?";
  //"https://cors-anywhere.herokuapp.com/"+ x1;
  //"http://anyorigin.com/get?url=google.com&callback="
  urls=proxyUrl;
  //urls="https://www.pexels.com/search/beauty/";
  var x6 = nullValueCheck(document.forms["singleURLForm"][urlEndPartName].value);
  var data="";
  var changablePartString="";

  var xobj = new XMLHttpRequest();
  var obj = { "webURL":urls };
  dbParam = JSON.stringify(obj);
  var xobj = new XMLHttpRequest();
    // xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function () 
    {
      if (xobj.readyState == 4 && xobj.status == 200)
      {
        var responseData = xobj.response;
      }
    };
    // xobj.open("POST", "./ProjFiles/PHPServices/PHPCORSByPass.php", true);
    xobj.open("GET", urls, true);
    xobj.setRequestHeader("Content-type", "application/json");
    // xobj.send(dbParam);
    xobj.send();
}
*/

function AccessXXYY10XXYYmodelData()
{
    var urls="";
    var imageType = document.forms["singleURLForm"]["imageTypes"].value;
    var x1 = document.forms["singleURLForm"][urlStartPartName].value;
    urls=x1;
    var x2 = document.forms["singleURLForm"]["startIndex"].value;
    var x3 = document.forms["singleURLForm"]["endIndex"].value;
    var x4 = document.forms["singleURLForm"]["HasZero"].value;
    var x5 = nullValueCheck(document.forms["singleURLForm"]["fixedURLEndPoint"].value);
    var x6 = nullValueCheck(document.forms["singleURLForm"][urlEndPartName].value);
    var data="";
    var changablePartString="";
    for(var i=x2; i<=x3; i++)
    {
      for(var k=0; k<100; k++)
      {
        var changablePart = i+"/"+k+"/10"+i+k;
        if(x4 == "yes")
        {
            if(i<10)
            {
                changablePart = "0"+i+"/"+"0"+k+"/10"+"0"+i+"0"+k;
            }
            // console.log(changablePart);
        }
        changablePartString = urls+changablePart+x5+x6+"."+imageType;
        data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+changablePartString+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+changablePartString+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        // console.log(changablePartString);
      }
    }
    var y=document.getElementById("dataDisplayDiv");
    y.innerHTML = data;
}

function Accessx_ymodelmodelData()
{
  var urls="";
  var imageType = document.forms["singleURLForm"]["imageTypes"].value;
  var x1 = document.forms["singleURLForm"][urlStartPartName].value;
  urls=x1;
  var x2 = document.forms["singleURLForm"]["startIndex"].value;
  var x3 = document.forms["singleURLForm"]["endIndex"].value;
  var x4 = document.forms["singleURLForm"]["HasZero"].value;
  var x5 = nullValueCheck(document.forms["singleURLForm"]["fixedURLEndPoint"].value);
  var x6 = nullValueCheck(document.forms["singleURLForm"][urlEndPartName].value);
  var data="";
  var changablePartString="";
  for(var i=x2; i<=x3; i++)
  {
    for(var k=0; k<100; k++)
    {
      var changablePart = i+"/"+k+"/10"+i+k;
      if(x4 == "yes")
      {
          if(i<10)
          {
              changablePart = "0"+i+"/"+"0"+k+"/10"+"0"+i+"0"+k;
          }
          // console.log(changablePart);
      }
      changablePartString = urls+changablePart+x5+x6+"."+imageType;
      data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+changablePartString+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+changablePartString+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
      // console.log(changablePartString);
    }
  }
  var y=document.getElementById("dataDisplayDiv");
  y.innerHTML = data;
}

function __SubmitURL()
{
  _SubmitURL([10,21,5,11,1,54]);
}

function _SubmitURL(_args)
{
  var args = [];
  for(var i=0; i<_args.length-1; i++)
  {
    args[i] = _args[i];
  }

  for(var i=_args.length-1; i>=0; i++)
  {
    // for(var i=)
    // var sss = "xxx";
    if(i > -1)
    {
      var ddd = _SubmitURL(args);
      sss = i+"/"+ddd;
      
      console.log(sss);
      return sss;
    }
  }
  /*
  for(var i=0; i<arguments.length; i++)
  {
  }
  for(var i=arguments.length-1; i>=0; i++)
  {
    if(i > -1)
    {
      _SubmitURL()
    }
  }
  */
}

function generateForLoop(repetitions)
{
  for(var i=0; i <= repetitions; i++ )
  {

  }
}
// __SubmitURL();
function AccessMultipleURLData()
{
    // alert("Method AccessSingleURLData() is accessed");
    // SubmitURL();
    var urls="";
    //   var x6 = document.forms["addURLForm"]["preDefinedURLs"].value;
    var imageType = document.forms["multipleIncrementURLForm"]["imageTypes"].value;
    var x1 = document.forms["multipleIncrementURLForm"][urlStartPartName].value;
    urls=x1;

    // var x2 = document.forms["multipleIncrementURLForm"]["startIndex"].value;
    // var x3 = document.forms["multipleIncrementURLForm"]["endIndex"].value;
    // var x4 = document.forms["multipleIncrementURLForm"]["HasZero"].value;
    // var x5 = nullValueCheck(document.forms["multipleIncrementURLForm"]["fixedURLEndPoint"].value);
    var x6 = nullValueCheck(document.forms["multipleIncrementURLForm"][urlEndPartName].value);
    var data="";
    var changablePartString="";

    // urlChangingIndexPartChildren

    for(var i= x2; i<=x3; i++)
    {
        var changablePart = i;
        if(x4 == "yes")
        {
            if(i<10)
            {
                changablePart = "0"+i;
            }
            console.log(changablePart);
        }
        changablePartString = urls+changablePart+x5+x6+"."+imageType;
        data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+changablePartString+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+changablePartString+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        console.log(changablePartString);
    }
    if(x4 == "yes")
    {
      
    }
    else
    {
      for(var i= x2; i<=x3; i++)
      {
        if(i<10)
        {
          {
            data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+urls+i+"."+imageType+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+urls+i+"."+imageType+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
          }
        }
        else
        {
          data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+urls+i+"."+imageType+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+urls+i+"."+imageType+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        }
      }
    }
  //   var y=document.getElementById("listview");
  //   y.innerHTML = data;
}
function SubmitURL()
{}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function TryRegex(strData, regexExp)
{
    
    //var myRe = regexExp;///d(b+)d/g;
    // var myArray = myRe.exec(strData);//('cdbbdbsbz');
    var myArray = strData.match(regexExp);//('cdbbdbsbz');

    /*
    var str = "The rain in SPAIN stays mainly in the plain"; 
    var res = str.match(/ain/gi);
    */

    var data = "";
    for(var i = 0; i < myArray.length; i++)
    {
      data += myArray[i] + "\n" ;
    }
    alert(data);
}
