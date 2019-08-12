using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using TestSampleOne.BusinessAccessLayer;
using Xamarin.Forms;

namespace TestSampleOne.Views
{
    public partial class TestOnePage : ContentPage
    {
        string serviceResponse = "";
        public TestOnePage()
        {
            InitializeComponent();
        }

        async void ButtonClickedEvent(object sender, System.EventArgs e)
        {
            try
            {
                //var _url = "https://www.pexels.com/search/beauty/";
                var _url = "https://www.pexels.com/search/";
                var _methodName = "beauty";
                var url = (!string.IsNullOrEmpty(entryURL.Text)) ? entryURL.Text : _url;
                using (IWebServices webServices = new WebServices())
                {
                    var response = await webServices.GetHTMLFromURL(_url, _methodName);
                    serviceResponse = response.ToString();
                }
                //labelJSONStringData.Text = serviceResponse;
                var tree = serviceResponse.Split('>');
                //List<StringList> stringLists = new List<StringList>();
                //var stree = "{\"data\":[{\"Name\":\"\" },{\"Name\":\"\" }]}";
                var stree = "{\"data\":[";//{\"Name\":\"\" },{\"Name\":\"\" }]}
                foreach(var item in tree)
                {
                    if (item.ToLower().Contains("img") || item.ToLower().Contains("image"))
                    {
                        if (item.Contains("src"))
                        {
                            var _item = (item.Contains("\"")) ? item.Replace("\"", "\\\"") : item;
                            _item = (_item.Contains("\n")) ? _item.Replace("\n", "") : _item;
                            stree += "{\"Name\":\"" + _item + ">\" },";
                            //stringLists.Add()
                            //obtData.Add(item, HTMLAttributes(item)["src"]);
                        }
                    }
                }
                stree = stree.Remove(stree.Length - 1);
                stree += "]}";

                var jsonString = Newtonsoft.Json.JsonConvert.DeserializeObject<HTMLSet>(stree);
                List<string> imagesURLList = new List<string>();
                foreach (var item in jsonString.data)
                {
                    var attrs = HTMLAttributes(item.Name);
                    foreach(var attr in attrs)
                    {
                        if(attr.Key == "src")
                        {
                            imagesURLList.Add(attr.Value);
                            try
                            {
                                Image image = new Image();
                                image.Source = ImageSource.FromUri(new Uri(attr.Value));

                                //galleryImageItem.Image_Source = ImageSource.FromStream(() =>
                                //{
                                //    return new System.IO.MemoryStream(Convert.FromBase64String(imageItem.File));
                                //});
                                //galleryImageItem.ImageStream = new System.IO.MemoryStream(Convert.FromBase64String(imageItem.File));
                                //using(var stream = new System.IO.MemoryStream(Convert.FromBase64String(imageItem.File)))
                                //{
                                //    galleryImageItem.ImageStream = stream;
                                //}

                                stackImageHolder.Children.Add(image);
                            }
                            catch(Exception ex)
                            {
                                var msg = ex.Message + "\n" + ex.StackTrace;
                                System.Diagnostics.Debug.WriteLine(msg);
                            }
                        }
                    }
                }
                System.Diagnostics.Debug.WriteLine(stree);
                //var ress = HTMLAttributes(serviceResponse)["src"];
            }
            catch (Exception ex)
            {
                var msg = ex.Message + "\n" + ex.StackTrace;
                System.Diagnostics.Debug.WriteLine(msg);
            }
        }

        public Dictionary<string, string> HTMLAttributes(string tag)
        {
            Dictionary<string, string> attr = new Dictionary<string, string>();

            MatchCollection matches = Regex.Matches(tag, @"([^\t\n\f \/>""'=]+)(?:=)('.*?'|"".*?"")(?:\s|\/>|\>)");

            foreach (Match match in matches)
            {
                attr.Add(match.Groups[1].Value, match.Groups[2].Value.Substring(1, match.Groups[2].Value.Length - 2));
            }

            return attr;
        }

















function GetSeperateTags()
{
    var tree = serviceResponse.Split('>');
    //List<StringList> stringLists = new List<StringList>();
    //var stree = "{\"data\":[{\"Name\":\"\" },{\"Name\":\"\" }]}";
    var stree = "{\"data\":[";//{\"Name\":\"\" },{\"Name\":\"\" }]}
    foreach(var item in tree)
    {
        if (item.ToLower().Contains("img") || item.ToLower().Contains("image"))
        {
            if (item.Contains("src"))
            {
                var _item = (item.Contains("\"")) ? item.Replace("\"", "\\\"") : item;
                _item = (_item.Contains("\n")) ? _item.Replace("\n", "") : _item;
                stree += "{\"Name\":\"" + _item + ">\" },";
                //stringLists.Add()
                //obtData.Add(item, HTMLAttributes(item)["src"]);
            }
        }
    }
    stree = stree.Remove(stree.Length - 1);
    stree += "]}";

    var jsonString = Newtonsoft.Json.JsonConvert.DeserializeObject<HTMLSet>(stree);
    List<string> imagesURLList = new List<string>();
    foreach (var item in jsonString.data)
    {
        var attrs = HTMLAttributes(item.Name);
        foreach(var attr in attrs)
        {
            if(attr.Key == "src")
            {
                imagesURLList.Add(attr.Value);
                try
                {
                    Image image = new Image();
                    image.Source = ImageSource.FromUri(new Uri(attr.Value));

                    //galleryImageItem.Image_Source = ImageSource.FromStream(() =>
                    //{
                    //    return new System.IO.MemoryStream(Convert.FromBase64String(imageItem.File));
                    //});
                    //galleryImageItem.ImageStream = new System.IO.MemoryStream(Convert.FromBase64String(imageItem.File));
                    //using(var stream = new System.IO.MemoryStream(Convert.FromBase64String(imageItem.File)))
                    //{
                    //    galleryImageItem.ImageStream = stream;
                    //}

                    stackImageHolder.Children.Add(image);
                }
                catch(Exception ex)
                {
                    var msg = ex.Message + "\n" + ex.StackTrace;
                    System.Diagnostics.Debug.WriteLine(msg);
                }
            }
        }
    }
    System.Diagnostics.Debug.WriteLine(stree);
}












    }

    //public class HTMLSet
    //{
    //    public List<StringList> StringList { get; set; }
    //}

    //public class StringList
    //{
    //    public string Name { get; set; }
    //    public string Source { get; set; }
    //}

    public class Datum
    {
        public string Name { get; set; }
    }

    public class HTMLSet
    {
        public List<Datum> data { get; set; }
    }
}