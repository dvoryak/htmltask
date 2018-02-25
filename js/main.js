function init() {
	for(var i in arr) {
		createRecord(arr[i]);
	}
}

document.addEventListener("DOMContentLoaded",init);

arr = [
		{name: "Это архив с русскими именем.zip", size: 1000, date: "2015.07.20 13:01:32"},
		{name: "_www_app.zip", size: 221, date: "2016.07.20 13:01:32"},
		{name: "Ато архив с русскими именем.zip", size: 1311, date: "2017.07.20 13:01:32"},
		{name: "Ято архив с русскими именем.zip", size: 55, date: "2018.07.20 13:01:32"},
		];

function sort(el) {

	var mode = el.innerText;

	if(mode.includes("Файл")) {
		update(nameSort,el);
	} else if (mode.includes("Размер")) {
		update(sizeSort,el);
	} else if(mode.includes("Дата и время")) {
		update(dateSort,el);
	}
}


function update(comparator,el) {
	var mode = el.innerText;

	if(mode.includes( "↓")) {
		buble_sort(arr,comparator);
		el.innerHTML = el.innerHTML.replace("↓","↑");
	} else {
		buble_sort(arr,comparator);
		arr.reverse();
		el.innerHTML = el.innerHTML.replace("↑","↓");
	}

	deleteRecords();
	for (var i in arr) {
		createRecord(arr[i]);
	}
}

function deleteRecords() {
	var body = document.getElementById("ttBody");

	while(body.firstChild) {
		body.removeChild(body.firstChild);
	}
}

function buble_sort(mas, comparator) {
	for(var i = 0; i < mas.length; i++) {
		for(var j = 0; j < mas.length - 1; j++) {
			if(comparator(mas[i],mas[j]) < 1) {
				var tmp = mas[i];
				mas[i] = mas[j];
				mas[j] = tmp;
			}
		}
	}
}


var nameSort = function(a,b){
	return (a.name<b.name?1:a.name==b.name?0:-1);
}

var sizeSort = function(a,b) {
	return a.size < b.size ? 1 : a.size == b.size ? 0 : -1;
}

var dateSort = function(a,b) {
	var dateA = new Date();
	var dateB = new Date();
	dateA.setTime(Date.parse(a.date));
	dateB.setTime(Date.parse(b.date));
	return dateA.getTime() - dateB.getTime();
}


function createRecord(record) {
	var body = document.getElementById("ttBody");

	var tr = document.createElement("tr");
	body.appendChild(tr);

	var name = document.createElement("td");
	name.innerHTML = record.name;
	tr.appendChild(name);
	var size = document.createElement("td");
	size.innerHTML = record.size;
	tr.appendChild(size);
	var date = document.createElement("td");
	date.innerHTML = record.date;
	tr.appendChild(date);
	var del = document.createElement("td");
	tr.appendChild(del);
	var delLink = document.createElement("a");
	del.appendChild(delLink);
	delLink.setAttribute("href","#");
	delLink.className = "delete-label";
	delLink.innerHTML = "Удалить";
}
