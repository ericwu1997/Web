//        window.onclick = function(event) {
//            var popup = document.getElementById("info_popup");
//            var okBtn = document.getElementById("okBtn");
//            if (event.target == popup || event.target == okBtn) {
//                popup.innerHTML = "";
//                popup.style.display = "none";
//            }
//        }
        function closePopUp(){
			document.getElementsByTagName( 'html' )[0].className = "";
            var popup = document.getElementById("info_popup");
            popup.innerHTML = "";
            popup.style.display = "none";
        }
        
        function popup(mealtime, dish_name){
			document.getElementsByTagName( 'html' )[0].className = "popup-open";
            var clickEventType=((document.onclick !== null) ? 'touchstart' : 'click');
            
            var popup = document.getElementById("info_popup");
            popup.addEventListener(clickEventType, function(e) {closePopUp();}, false);

            var content = document.createElement("div");
            content.className = "info_content";

            var dishName = document.createElement("div");
            dishName.setAttribute("id", "dish_name");
            var dishName_h1 = document.createElement("h1");
            dishName_h1.innerHTML = "Loading ...";
            dishName_h1.setAttribute("id", "popup_title");
            dishName.appendChild(dishName_h1);

            var infoTable = document.createElement("table");
            infoTable.setAttribute("id", "info_table");

            var info_img = document.createElement("img");
            info_img.setAttribute('src', './img/' + dish_name + '.jpg');
            info_img.setAttribute("id", "info_img");

            var okBtn = document.createElement("div");
            okBtn.setAttribute("id", "okBtn");
            okBtn.appendChild(document.createTextNode("OK"));
            okBtn.addEventListener(clickEventType, function(e) {closePopUp();}, false);

            content.appendChild(dishName);
            content.appendChild(infoTable);
            content.appendChild(info_img);
            content.appendChild(okBtn);

            popup.appendChild(content);
            
            appendIngredients(mealtime, dish_name);
            
            popup.style.display = "block";
        }
        
        function dishNameFromSrc(src){
            var src = document.getElementById(src).src;
            var src_array = src.split("/");
            var dishName = src_array[src_array.length - 1];
            dishName = dishName.split(".")[0];
            return dishName;
        }
    
        function appendIngredients(mealtime, dish_name){
            var table = document.getElementById("info_table");
            dbDish = db.ref().child('meals').child(mealtime).child(dish_name);
            dbDish.once("value").then(function(dish_snapshot) {  
                document.getElementById("popup_title").innerHTML = dish_snapshot.key.charAt(0).toUpperCase() + dish_snapshot.key.replace(/([A-Z])/g, ' $1').slice(1);
                dish_snapshot.forEach(function(ingredient_snapshot) {
                    var row = document.createElement("tr");
                    var ingredient = document.createElement("td");
                    ingredient.appendChild(document.createTextNode(ingredient_snapshot.key.charAt(0).toUpperCase() + ingredient_snapshot.key.replace(/([A-Z])/g, ' $1').slice(1)));                   
                    ingredient_snapshot.ref.child("qty").once("value").then(function(qty_snapshot) {
                        var amount = document.createElement("td");
                        amount.appendChild(document.createTextNode(qty_snapshot.val()));       
                        ingredient_snapshot.ref.child("unit").once("value").then(function(unit_snapshot) {
                            var unit = document.createElement("td");
                            unit.appendChild(document.createTextNode(unit_snapshot.val()));
                            row.appendChild(ingredient);
                            row.appendChild(amount);
                            row.appendChild(unit);
                            table.appendChild(row);
                        });
                    });
                });
            });
            
        }