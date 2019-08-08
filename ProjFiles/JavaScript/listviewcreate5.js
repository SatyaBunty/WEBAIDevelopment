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

// function UpdateForm()
// {
//     var selectedOption = document.getElementById("URLOptions").value;
//     var data = "";
//     if(selectedOption === "I have a URL")
//     {
//         data = "<table> <form method=\"POST\" name=\"singleURLForm\" action=\"\" onsubmit=\"AccessSingleURLData(); return false;\"><tr><td>Name:</td><td><input type=\"text\" name=\"itemId\"/></td></tr><tr><td>Password:</td><td><input type=\"password\" name=\"passwordId\"/></td></tr><tr><td><input type=\"submit\" name=\"submitForm\" value=\"Submit\"/></td></tr></form><script>function AccessSingleURLData() { alert(\"Method AccessSingleURLData() is accessed\"); }</script></table>";
//         // data = "<table>"+
//         // // "<form name=\"singleURLForm\" action=\"\" onsubmit=\"AccessSingleURLData(); return false;\" onclick=\"AccessSingleURLData()\">"+
//         // "<form method=\"POST\" name=\"singleURLForm\" action=\"\" onsubmit=\"AccessSingleURLData(); return false;\">"+
//         // "<tr>"+
//         // "<td>"+
//         // "Name:"+
//         // "</td>"+
//         // "<td>"+
//         // "<input type=\"text\" name=\"itemId\"/>"+
//         // "</td>"+
//         // "</tr>"+
//         // "<tr>"+
//         // "<td>"+
//         // "Password:"+
//         // "</td>"+
//         // "<td>"+
//         // "<input type=\"password\" name=\"passwordId\"/>"+
//         // "</td>"+
//         // "</tr>"+
//         // "<tr>"+
//         // "<td>"+
//         // "<input type=\"submit\" name=\"submitForm\" value=\"Submit\"/>"+
//         // "</td>"+
//         // "</tr>"+
//         // "</form>"+
//         // "<script>"+
//         // "function AccessSingleURLData() { alert(\"Method AccessSingleURLData() is accessed\"); }"+
//         // "</script>"+
//         // "</table>";
//         // var singleURLFormDiv = document.getElementById("singleURLFormDiv");
//         // singleURLFormDiv.visibility=visibile;
//         // singleURLFormDiv.style.visibility=visible;
//     }
//     var formDiv = document.getElementById("formDiv");
//     formDiv.innerHTML = (data);
// }

/*
On Fri, May 31, 2019 at 12:34 AM sivaprasad reddy <pvsivapr@gmail.com> wrote:
//var json = require('../ProjFiles/LocalFiles/JsonFiles/URLs.json');
// onAppStart();
function onAppStart()
{
   // x.appendChild(y);
   // this requests the file and executes a callback with the parsed result once
   //   it is available
   /*
   fetchJSONFile('./ProjFiles/LocalFiles/JsonFiles/URLs.json', function(data)
   {
       // do something with your data
       console.log(data);
   });*/

   /*
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function()
   {
       if (xhr.readyState === XMLHttpRequest.DONE)
       {
           if (xhr.status === 200 && xhr.readyState === 4)
           {
             var dddddd = xhr.response;
               if (success)
               {
                 success(JSON.parse(xhr.responseText));
               }
            }
            else
            {
              if (error)
              {
                error(xhr);
              }
           }
       }
   };
   xhr.open("GET", "./ProjFiles/LocalFiles/JsonFiles/URLs.json", true);
   */


   //xhr.send();


   /*
   var a = new XMLHttpRequest();
   a.open("GET","./ProjFiles/LocalFiles/JsonFiles/URLs.json",true);
   a.onreadystatechange = function() {
     if( this.readyState == 4) 
     {
       if( this.status == 200) 
       {
         var json = window.JSON ? JSON.parse(this.reponseText) : eval("("+this.responseText+")");
         // do something with json
        }
        else alert("HTTP error "+this.status+" "+this.statusText);
      }
    }
    // a.send();
    * /


    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './ProjFiles/LocalFiles/JsonFiles/URLs.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () 
    {
      if (xobj.readyState == 4 && xobj.status == 200)
      {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        //callback(xobj.responseText);
        var data = xobj.response;
        var options = JSON.parse(data);
        var option = document.getElementById('URLOptions');
        var optionsHTML="";
        for(i=0; i<options.length; i++ )
        {
          optionsHTML = optionsHTML+"<option value="+options[i].url+">"+options[i].name+"</option>";
        }
        option.innerHTML = option.innerHTML+optionsHTML;
      }
    };
    xobj.send();
    //xobj.send(null);  
    // onAppStartTwo();
 }


function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              var data = JSON.parse(httpRequest.responseText);
              if (callback) callback(data);
          }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}

function SubmitURL()
{
  var urls="";
  var x6 = document.forms["addURLForm"]["preDefinedURLs"].value;
  var imageType = document.forms["addURLForm"]["imageTypes"].value;
  var x1 = document.forms["addURLForm"]["url"].value;
  // if(x6=="I have a URL")
  // {
  //   urls=x1;
  // }
  // else
  // {
  //   urls=x6;
  // }
  urls=x1;
  var x2 = document.forms["addURLForm"]["startIndex"].value;
  var x3 = document.forms["addURLForm"]["endIndex"].value;
  var x4 = document.forms["addURLForm"]["HasZero"].value;
  var data="";
  if(x4 == "1")
  {
    for(var j= x2; j<=x3; j++)
    {
      //https://www.babescartel.com/tour/content//contentthumbs/15/29/101529-1x.jpg
      for(var k = 0; k<100;k++)
      {
        var i = "";
        if(j<10)
        {
          if(k<10)
          {
            i = "0"+j+"/"+"0"+k+"/10"+"0"+j+"0"+k+"-1x";
          }
          else
          {
            i = "0"+j+"/"+k+"/10"+"0"+j+k+"-1x";
          }
        }
        else
        {
          if(k<10)
          {
            i = j+"/"+"0"+k+"/10"+j+"0"+k+"-1x";
          }
          else
          {
            i = j+"/"+k+"/10"+j+k+"-1x";
          }
        }
        data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+urls+i+"."+imageType+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+urls+i+"."+imageType+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
      }
      // if(i<10)
      // {
      //   {
      //     data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+urls+"0"+i+"."+imageType+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+urls+"0"+i+"."+imageType+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
      //   }
      // }
      // else
      // {
      //   data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+urls+i+"."+imageType+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+urls+i+"."+imageType+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
      // }
    }
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
  var y=document.getElementById("listview");
  y.innerHTML = data;
}

function UpdateURL()
{
  var urlId = document.getElementById('URLValue');
  var urlval = document.getElementById('URLOptions');
  var modelval = document.getElementById('ModelOptions');
  if(urlval.value == "http://cdn.brutalx.com/content/thumbs/")
  {
    //modelval.style.display = 'block'; //for java script but effects UI design
    modelval.style.visibility = 'visible'; //for java script
    //modelval.show(); //for jquery

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './ProjFiles/LocalFiles/JsonFiles/BrutalXModels.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () 
    {
      if (xobj.readyState == 4 && xobj.status == 200)
      {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        //callback(xobj.responseText);
        modelval.innerHTML = "";
        var data = xobj.response;
        var options = JSON.parse(data);// {"code" : "", "url" : ""},
        var optionsHTML="";
        for(i=0; i<options.length; i++ )
        {
          optionsHTML = optionsHTML+"<option value="+options[i].url+">"+options[i].code+"</option>";
        }
        modelval.innerHTML = modelval.innerHTML+optionsHTML;
      }
    };
    xobj.send();

  }
  else
  {
    //modelval.style.display = 'none'; //for java script but effects UI design
    modelval.style.visibility = 'hidden'; //for java script
    //modelval.hide(); //for jquery
  }
  urlId.value = urlval.value;

}

function UpdateModel()
{
  var urlId = document.getElementById('URLValue');
  var urlval = document.getElementById('URLOptions');
  var modelval = document.getElementById('ModelOptions');
  urlId.value = (urlval.value)+(modelval.value);
}

function myFunction()
{
   var showLocal = confirm("Do you really want to see local images");
   if(showLocal == true)
   {
  var url = "../LocalImages";
  var localURL = "ProjFiles/LocalImages/";
  var obj = { "localURL":url };
  dbParam = JSON.stringify(obj);
  var xobj = new XMLHttpRequest();
    // xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function () 
    {
      if (xobj.readyState == 4 && xobj.status == 200)
      {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        //callback(xobj.responseText);
         var data ="";
        var responseData = xobj.response;
        var options = JSON.parse(responseData);
        var optionsHTML="";
        for(i=0; i<options.all_local_files.length; i++ )
        {
          data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+localURL+options.all_local_files[i]+"\" target=\"_blank\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+localURL+options.all_local_files[i]+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        }
        var y=document.getElementById("listview");
        y.innerHTML = data;
      }
    };
    xobj.open("POST", "./ProjFiles/PHPServices/ReceiveService.php?userRequest=GetLocalImages", true);
    xobj.setRequestHeader("Content-type", "application/json");
    xobj.send(dbParam);
    }
    else
    {
    }
}




function _myFunction()
{
  var url = "../LocalImages";
  var localURL = "ProjFiles/LocalImages/";
  var obj = { "localURL":url };
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
        var options = JSON.parse(responseData);
        var optionsHTML="";
        for(i=0; i<options.all_local_files.length; i++ )
        {
          data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+localURL+options.all_local_files[i]+"\" >"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+localURL+options.all_local_files[i]+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        }
        var y=document.getElementById("listview");
        y.innerHTML = data;
      }
    };
    xobj.open("POST", "./ProjFiles/PHPServices/ReceiveService.php?userRequest=GetLocalImages", true);
    xobj.setRequestHeader("Content-type", "application/json");
    xobj.send(dbParam);
}

// onAppStartOne();

function onAppStartOne()
{
  var url = "../LocalImages";
  var localURL = "ProjFiles/LocalImages/";
  var obj = { "localURL":url };
  dbParam = JSON.stringify(obj);
  var xobj = new XMLHttpRequest();
    // xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function () 
    {
      if (xobj.readyState == 4 && xobj.status == 200)
      {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        //callback(xobj.responseText);
        var data = xobj.response;
        var options = JSON.parse(data);
        var optionsHTML="";
        for(i=0; i<options.all_local_files.length; i++ )
        {
          optionsHTML += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+localURL+options.all_local_files[i]+"\" target=\"_blank\">"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+localURL+options.all_local_files[i]+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        }
        var y=document.getElementById("listview");
        y.innerHTML = optionsHTML;
      }
    };
    xobj.open("POST", "./ProjFiles/PHPServices/ReceiveService.php?userRequest=GetLocalImages", true);
    xobj.setRequestHeader("Content-type", "application/json");
    xobj.send(dbParam);
    // alert(e.dataset.id+"\n"+e.dataset.option);
}

onAppStartTwo();

function onAppStartTwo()
{
  var url = "../LocalFiles/Games";
  var localURL = "ProjFiles/LocalFiles/Games/";
  var obj = { "localURL":url };
  dbParam = JSON.stringify(obj);
  var xobj = new XMLHttpRequest();
    // xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function () 
    {
      if (xobj.readyState == 4 && xobj.status == 200)
      {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        //callback(xobj.responseText);
        var data = xobj.response;
        var options = JSON.parse(data);
        var optionsHTML="";
        data = "<select id=\"GameSelector\">";
        for(i=0; i<options.all_local_files.length; i++ )
        {
            //localURL+options.all_local_files[i]
            data += "<option value=\""+localURL+options.all_local_files[i]+"\">"+options.all_local_files[i]+"</option>";
          //data += "<div id=\"lvtemplate\" style=\" position:static; margin:auto; padding-top: 12px; padding-right: 13px; padding-bottom: 16px; padding-left: 15px; height:400px; width:160px; float:left; vertical-align:middle\">"+"\n"+"<center>"+"\n"+"<h2>"+"\n"+" hi, hello"+"\n"+"</h2>"+"\n"+"<a href=\""+localURL+options.all_local_files[i]+"\" target=\"_blank\">"+"\n"+"<img style=\"height : 200px; width : 200px; float:left\"src=\""+localURL+options.all_local_files[i]+"\" />"+"\n"+"</a>"+"\n"+"<h3>"+"\n"+"see you..."+"\n"+"</h3>"+"\n"+"</center>"+"\n"+"</div>";
        }
        data += "</select>";
        var y=document.getElementById("GameSelection");
        y.innerHTML = data;
      }
    };
    xobj.open("POST", "./ProjFiles/PHPServices/ReceiveService.php?userRequest=GetLocalImages", true);
    xobj.setRequestHeader("Content-type", "application/json");
    xobj.send(dbParam);
    // alert(e.dataset.id+"\n"+e.dataset.option);
}

//getDimensions();
function getDimensions()
{
    var x=document.getElementById("GameSelector");
    var gameName = x.value;

    var obj = { "fileUrl":"../../"+gameName};
    // var obj = { "fileUrl":"./../../planerace.swf"};
    dbParam = JSON.stringify(obj);
    var bodyLeftUI = document.getElementById("audioLeftBody");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var myObj = JSON.parse(this.response);
            // var flashBox = document.getElementById("flashFIle");
            // flashBox.height = myObj.dimensions.height;
            // flashBox.width = myObj.dimensions.width;
            // flashBox.src = gameName;
            // var flashBoxHolder = document.getElementById("flashFileHolder");
            var flashBoxHolder = document.getElementById("listview");
            flashBoxHolder.height = myObj.dimensions.height;
            flashBoxHolder.width = myObj.dimensions.width;

            flashBoxHolder.innerHTML = " <embed src=\""+gameName+"\" id=\"flashFIle\" width=\""+myObj.dimensions.width+"\" height=\""+myObj.dimensions.height+"\">";
        }
    };///Applications/XAMPP/xamppfiles/htdocs/AllHTMLProjects/FlashWebSample/ProjFiles/PhpFiles/GetSWFDimensions.php

    xmlhttp.open("POST", "./ProjFiles/PHPServices/GetSWFDimensions.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(dbParam);
}

// onAppStart();

function onAppStarts()
{

  // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@* /false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


if(isIE)
{
  var fso,d, s;
  fso = new ActiveXObject("Scripting.FileSystemObject");
  d = fso.GetDrive("../ProjFiles/LocalFiles/JsonFiles");
  s = d.FileSystem;
  return(s);
}
else
{

}
// v.0.1.2
var path = "";  
var file_type="jpg";
var title="download";
var param_path="../ProjFiles/LocalFiles/JsonFiles";
if(!param_path) {
  var tmp_file = File.openDialog(title, file_type);   
  if(!tmp_file) {exit(); };
  path = tmp_file.path;
}else { path = param_path; };

var my_folder = new Folder(path);
var eee = my_folder.getFiles(file_type);
return eee;
//   fileName = findFirstFile("*.*"); // Find the first file matching the filter 
// while(fileName.length) 
// { 
//     write(fileName); 
//     fileName = findNextFile();  // Find the next file matching the filter 
// }
  // var files = fs.readdirSync('./LocalImages/');
  
}
function ShowFileSystemType(drvPath)
{
var fso,d, s;
fso = new ActiveXObject("Scripting.FileSystemObject");
d = fso.GetDrive(drvPath);
s = d.FileSystem;
return(s);
}


function _fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              var data = JSON.parse(httpRequest.responseText);
              if (callback) callback(data);
          }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}
*/