var fieldText = document.querySelector(".field__text"); // Поле ввода
var fieldList = document.querySelector(".field__list"); // Блок с выбором города
var cityes; // все города

// Запрос
fetch("https://api.hh.ru/areas/5")
.then(response => response.json())
.then(data => cityes = data.areas)
.then(cityes => parse(cityes));

// Функция добавления городов в список
function parse(cityes) {
    for (let i = 0; i < cityes.length; i++) {
        var cityRegion = cityes[i].areas;
        for (let i = 0; i < cityRegion.length; i++) {
            var li = document.createElement("li");
            li.classList.add("list-item");
            li.textContent = cityRegion[i].name;
            li.style.display = "none";
            fieldList.appendChild(li);
            li.addEventListener("click", function() {
                document.querySelectorAll(".list-item").forEach(item => {
                    item.style.display = "none";
                });
                fieldText.value = this.textContent;
            });
        }
    }
}

// Функция "просеивания" городов
function enterCity() {
    var search = fieldText.value;
    var allItems = document.querySelectorAll(".list-item");

    for (let i = 0; i < allItems.length; i++) {
        var item = allItems[i];
        if (search.length === 0) {
            allItems[i].style.display = "none";
        } else if (item.innerHTML.toLowerCase().indexOf(search) > -1) {
            allItems[i].style.display = "block";
		} else {
			allItems[i].style.display = "none";
        }
    }
}

fieldText.addEventListener("keyup", enterCity);