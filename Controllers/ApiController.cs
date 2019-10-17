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
		public IActionResult Valutes(string date) {
			Console.WriteLine(date);

			List<Dictionary<string, object>> allValutes = new List<Dictionary<string, object>>();
			string url = $"http://www.cbr.ru/scripts/XML_daily.asp?date_req={date}";
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
		public IActionResult Quotation(string valuteId, string startDate, string endDate) {

			Dictionary<string, List<string>> data = new Dictionary<string, List<string>>();
			List<string> dates = new List<string>();
			List<string> values = new List<string>();
			string url = $"http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1={startDate}&date_req2={endDate}&VAL_NM_RQ={valuteId}";
			XmlDocument xdoc = new XmlDocument();
			
			Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
			Encoding.GetEncoding("windows-1251");
			xdoc.Load(url);
			XmlNodeList records = xdoc.SelectNodes("//Record");

			foreach (XmlElement record in records) {
				dates.Add(record.GetAttribute("Date"));
				values.Add(record.LastChild.InnerText);
			}

			data.Add("dates", dates);
			data.Add("values", values);

			return Json(data);
		}
	}
}