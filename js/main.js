var currencyListUrl = "https://api.kursna-lista.info/ba5e62311d6048fe090e243f44fe050d/kursna_lista/json";
var currencyList = getServiceData(currencyListUrl).result;
var currencyListArray = [];

console.log(currencyListArray);


//get currency values
for (var i in currencyList) {
	if (i != "date") {
		var currency = {
			val: i,
			kup: Number(currencyList[i].kup),
			sre: Number(currencyList[i].sre),
			pro: Number(currencyList[i].pro)
		};
		currencyListArray.push(currency);
	}
}


//show currency in table
showCurrency();

function showCurrency() {

	var catalog = document.getElementById("catalog");

	var table = document.createElement("table");
	table.setAttribute("class", "table");
	catalog.appendChild(table);

	var thead = document.createElement("thead");
	table.appendChild(thead);
	var tr = document.createElement("tr");
	thead.appendChild(tr);

	var currencyTd = document.createElement("td");
	currencyTd.innerHTML = "<b>Valuta</b>";
	tr.appendChild(currencyTd);

	var kupovniTd = document.createElement("td");
	kupovniTd.innerHTML = "<b>Kupovni</b>";
	tr.appendChild(kupovniTd);

	var srednjiTd = document.createElement("td");
	srednjiTd.innerHTML = "<b>Srednji</b>";
	tr.appendChild(srednjiTd);

	var prodajniTd = document.createElement("td");
	prodajniTd.innerHTML = "<b>Prodajni</b>";
	tr.appendChild(prodajniTd);

	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	for (var i in currencyListArray) {

		var trBody = document.createElement("tr");
		tbody.appendChild(trBody);

		var tdCurrency = document.createElement("td");
		trBody.appendChild(tdCurrency);

		var currencyImg = document.createElement("img");
		currencyImg.setAttribute("src", "images/" + currencyListArray[i].val + ".png");
		currencyImg.setAttribute("alt", currencyListArray[i].val);
		tdCurrency.appendChild(currencyImg);

		var currencySpan = document.createElement("span");
		currencySpan.innerHTML = currencyListArray[i].val;
		tdCurrency.appendChild(currencySpan);

		var tdKupovni = document.createElement("td");
		tdKupovni.innerHTML = currencyListArray[i].kup;
		trBody.appendChild(tdKupovni);

		var tdSrednji = document.createElement("td");
		tdSrednji.innerHTML = currencyListArray[i].sre;
		trBody.appendChild(tdSrednji);

		var tdProdajni = document.createElement("td");
		tdProdajni.innerHTML = currencyListArray[i].pro;
		trBody.appendChild(tdProdajni);
	}
}


//inport currency values to selsect
function select() {

	var select1 = document.getElementById("fromCurrency");
	for (var i in currencyListArray) {
		var option = document.createElement("option");
		option.setAttribute("value", currencyListArray[i].val);
		option.innerHTML = currencyListArray[i].val;
		select1.appendChild(option);
	}
	var select2 = document.getElementById("toCurrency");
	for (var i in currencyListArray) {
		var option = document.createElement("option");
		option.setAttribute("value", currencyListArray[i].val);
		option.innerHTML = currencyListArray[i].val;
		select2.appendChild(option);
	}
}

select();

//https://api.kursna-lista.info/ba5e62311d6048fe090e243f44fe050d/konvertor/iz-val/u-val/iznos/datum/tip/format
//https://api.kursna-lista.info/ba5e62311d6048fe090e243f44fe050d/konvertor/eur/eur/100/23.11.2018/sre/json


$("#date").datepicker();


//get input values and build api url to convert currency
function convertor() {

	var url = "https://api.kursna-lista.info";
	var apiID = "/ba5e62311d6048fe090e243f44fe050d";
	var fromCurrency = document.getElementById("fromCurrency").value;
	var toCurrency = document.getElementById("toCurrency").value;
	var amount = document.getElementById("amount").valueAsNumber;
	var date = new Date(document.getElementById("date").value);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	if (day < 10 || month < 10) {
		day = "0" + day;
		month = "0" + month;
	}

	date = day + "." + month + "." + year;
	var currencyApiUrl = url + apiID + "/konvertor/" + fromCurrency + "/" + toCurrency + "/" + amount + "/" + date + "/sre/" + "json";
	var convert = getServiceData(currencyApiUrl).result;

	for (var i in convert) {
		var newAmount = convert[i];
	}
	document.getElementById("newAmount").innerHTML = newAmount;
}

function getServiceData(url, username, password) {

	try {
		var result;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					result = JSON.parse(xmlhttp.response);
				} else {
					return false;
				}
			}
		}
		xmlhttp.open("GET", url, false, username, password);
		xmlhttp.send();
		return result;
	} catch (err) {
		return err;
	}
}
