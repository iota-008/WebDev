// function clearDefault(a) {
// 	 if (a.defaultValue == a.value) {
// 			a.textContent = "";
// 	 }
// }

function get_todos() {
	var todo = new Array();
	var todos = localStorage.getItem("todo");
	if (todos !== null) {
		todo = JSON.parse(todos);
	}
	return todo;
}

function add() {
	var todo = document.getElementById("task").value;
	var todos = get_todos();
	todos.push(todo);
	localStorage.setItem("todo", JSON.stringify(todos));
	document.getElementById("task").value = "";
	show();

	return false;
}

function remove() {
	var id = this.getAttribute("id");
	var todos = get_todos();
	todos.splice(id, 1);
	localStorage.setItem("todo", JSON.stringify(todos));
	show();

	return false;
}

function show() {
	var todos = get_todos();

	var html = "<ul>";
	for (var i = 0; i < todos.length; i++) {
		html +=
			"<li>" +
			todos[i] +
			"<button class='remove btn3d  btn-sm' id='" +
			i +
			"'>REMOVE</button></li>";
	}
	html += "</ul>";

	document.getElementById("todos").innerHTML = html;
	// var button = document.getElementsByClassName("remove");

	for (var i = 0; i < todos.length; i++) {
		// button[i].addEventListener("click", remove);
		document.getElementById(i).addEventListener("click", remove);
	}
}

var d = new Date();
document.getElementById("today").innerHTML +=
	":" + d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
document.getElementById("add").addEventListener("click", add);
show();
