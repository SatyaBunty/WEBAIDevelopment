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
      formData.setAttribute('name',"singleURLForm");
      formData.setAttribute('onsubmit',"AccessDynamicURLData(); return false;");
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

function AccessDynamicURLData()
{
    /*
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
        //onclick="window.open('anotherpage.html', '_blank');"
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        //callback(xobj.responseText);
        var responseData = xobj.response;
        // var options = JSON.parse(responseData);
        // var optionsHTML="";
        // for(i=0; i<options.all_local_files.length; i++ )
        // {
        //   data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+localURL+options.all_local_files[i]+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+localURL+options.all_local_files[i]+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        // }
        // var y=document.getElementById("listview");
        // y.innerHTML = data;
      }
    };
    // xobj.open("POST", "./ProjFiles/PHPServices/PHPCORSByPass.php", true);
    xobj.open("GET", urls, true);
    xobj.setRequestHeader("Content-type", "application/json");
    // xobj.send(dbParam);
    xobj.send();
    */

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
        var responseData = xobj.response;
        alert(responseData);
    }
    };
    xobj.open("POST", "./ProjFiles/PHPServices/PHPCORSByPass.php", true);
    xobj.setRequestHeader("Content-type", "application/json");
    xobj.send(dbParam);
}

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
