"use strict";
var dptosLocs = {
	"Artigas":["Artigas","Bella Unión"],
	"Canelones":["Canelones","Santa Lucía"],
	"Montevideo":["Montevideo"],
	"Salto":["Salto","Daymán","Arapey"]
};


function loadDepartamentos(placeToAdd){
    var parentPlace = document.getElementById(placeToAdd);
    for(var dep in dptosLocs) { 
        var optionDep = document.createElement('option');
        optionDep.value = dep;
        optionDep.innerHTML = dep;
        parentPlace.appendChild(optionDep);
    }

}
    
function loadLocalidades(placeToAdd){
    var willBeListener = document.getElementById('departamento');
    var parentPlace = document.getElementById(placeToAdd);
    willBeListener.addEventListener("change", () => {
        var dept = willBeListener.value;
        console.log(dept);
        if (dept != ""){
            document.getElementById(placeToAdd).innerHTML = "";
            var optionLoc = document.createElement('option');
            optionLoc.value = "",
            optionLoc.innerHTML = "Localidad";
            parentPlace.appendChild(optionLoc);
            console.log(dptosLocs[dept])
            for (var i = 0; i < dptosLocs[dept].length; i++) {
                var optionLoc = document.createElement('option');
                optionLoc.value = dptosLocs[dept][i];
                optionLoc.innerHTML = dptosLocs[dept][i];
                parentPlace.appendChild(optionLoc);
            }
            parentPlace.disabled = false;
        } 
    });
}

