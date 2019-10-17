using System.Collections.Generic;
using System.Text;
using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using RenessansApp.Models;
using System.Web;
using System.Xml;
using System.IO;

namespace RenessansApp.Controllers {
	public class ApiController : Controller {
		public IActionResult Valutes(){

			List<Dictionary<string, object>> allValutes = new List<Dictionary<string, object>>();
			string url = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=02/03/2002";
			XmlDocument xdoc = new XmlDocument();	
			
			Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
			Encoding.GetEncoding("windows-1251");
			xdoc.Load(url);
			XmlNodeList valutes = xdoc.SelectNodes("//Valute");

			foreach (XmlElement valute in valutes) {
				Dictionary<string, object> singleValute = new Dictionary<string, object>();
				singleValute.Add("valuteID", valute.GetAttribute("ID"));

				foreach (XmlElement item in valute){
					singleValute.Add(item.LocalName, item.InnerText);
				}
				
				allValutes.Add(singleValute);
			}

			return Json(allValutes);
		}
	}
}