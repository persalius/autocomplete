var fieldText = document.querySelector(".field__text"); // Поле ввода
var fieldList = document.querySelector(".field__list"); // Блок с выбором города
var cityes; // все города

// Запрос
fetch("https://api.hh.ru/areas/5")
.then(response => response.json())
.then(data => cityes = data.areas);


function enterCity() {
    var search = fieldText.value;

    var reg = new RegExp('^' + search, 'ig');
    fieldList.innerHTML = '';

    if (search.length > 0) {
        for (let i = 0; i < cityes.length; i++) {
            var cityRegion = cityes[i].areas;
            for (let i = 0; i < cityRegion.length; i++) {
                while (reg.exec(cityRegion[i].name)) {
                    var li = document.createElement("li");
                    li.classList.add("list-item");
                    li.textContent = cityRegion[i].name;
                    fieldList.appendChild(li);
                    li.addEventListener("click", function() {
                        fieldList.innerHTML = '';
                        fieldText.value = this.textContent;
                    });
                }
                
            }
        }
    }
}

fieldText.addEventListener("keyup", enterCity);