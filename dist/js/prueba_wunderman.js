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


/*************************************************************************************************************************/
/********************** VALIDATION ***************************************************************/
/*************************************************************************************************************************/

function validarCedula(ci) {
    //Inicializo los coefcientes en el orden correcto
    var arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
    var suma = 0;
    //Para el caso en el que la CI tiene menos de 8 digitos
    //calculo cuantos coeficientes no voy a usar
    var difCoef = parseInt(arrCoefs.length - ci.length);
    //recorro cada digito empezando por el de más a la derecha
    //o sea, el digito verificador, el que tiene indice mayor en el array
    for (var i = ci.length - 1; i > -1; i--) {
        //Obtengo el digito correspondiente de la ci recibida
        var dig = ci.substring(i, i + 1);
        //Lo tenía como caracter, lo transformo a int para poder operar
        var digInt = parseInt(dig);
        //Obtengo el coeficiente correspondiente al ésta posición del digito
        var coef = arrCoefs[i + difCoef];
        //Multiplico dígito por coeficiente y lo acumulo a la suma total
        suma = suma + digInt * coef;
    }
    var result = false;
    // si la suma es múltiplo de 10 es una ci válida
    if ((suma % 10) === 0) {
        result = true;
    }
    return result;
}

document.addEventListener("DOMContentLoaded", function(event) {

    loadDepartamentos('departamento');

    loadLocalidades('localidad');

    loadValidation('formLandingPage');
});
function displayMsg(elmentId,messageToAdd){
    var messageContainer = document.getElementById(elmentId);
    messageContainer.innerHTML = messageToAdd;
}

function addAclass(elmentId,classToAdd){
    var element =  document.getElementById(elmentId);
    var previousClasses = element.className;
    var newClass = previousClasses + " " + classToAdd;
    element.setAttribute("class" , newClass);
}

function removeAclass(elmentId,classToremove){
    var element =  document.getElementById(elmentId);
    var previousClasses = element.className;
    var newClass = previousClasses.replace(classToremove, "");
    element.setAttribute("class" , newClass);
}

function deleteMsg(msgId){
    document.getElementById(msgId).innerHTML = "";
}

function setToDefault(inputId,errorId){
    removeAclass(inputId, 'error-val');
    deleteMsg(errorId);

}

function reverseNumber(input) {
    return [].map.call(input, function(x) {
        return x;
        }).reverse().join(''); 
}

function plainNumber(number) {
    return number.split('.').join('');
}

function splitInDots(input) {
    
    var value = input.value,
        plain = plainNumber(value),
        reversed = reverseNumber(plain),
        reversedWithDots = reversed.match(/.{1,3}/g).join('.'),
        normal = reverseNumber(reversedWithDots);
    input.value = normal;
}
var nombreInput = document.getElementById('fNombre');
var apellidoInput =  document.getElementById('fApellido');
var emailInput = document.getElementById('fEmail');
var departamentoInput = document.getElementById('departamento');
var localidadInput = document.getElementById('localidad');
var ciInput = document.getElementById('fCI');
var condicionesInput = document.getElementById('conditions');

nombreInput.addEventListener('focus', () => {setToDefault('fNombre','errorNombre')}, false);
apellidoInput.addEventListener('focus', () => {setToDefault('fApellido','errorApellido')}, false);
emailInput.addEventListener('focus', () => {setToDefault('fEmail','errorEmail')}, false);
departamentoInput.addEventListener('focus', () => {setToDefault('departamento','errorDepartamento')}, false);
localidadInput.addEventListener('focus', () => {setToDefault('localidad','errorLocalidad')}, false);
ciInput.addEventListener('focus', () => {setToDefault('fCI','errorCi')}, false);
condicionesInput.addEventListener('focus', () => {setToDefault('conditions','errorConditions')}, false);

function loadValidation(formId){
    var targetForm = document.getElementById(formId);
    targetForm.addEventListener("submit", (event) =>{
        event.preventDefault();
        var validationAll = false;

        //get all the values
        var nombre = nombreInput.value;
        var apellido =  apellidoInput.value;
        var email = emailInput.value;
        var departamento = departamentoInput.value;
        var localidad = localidadInput.value;
        var ci = ciInput.value;
        var condiciones = condicionesInput.checked;

        //module validation
        validationAll = validationNombre(nombre) &&
                        validationApellido(apellido) &&
                        validacionEmail(email) && 
                        validationDepartamento(departamento) &&
                        validationLocalidad(localidad) &&
                        validationCI(ci) &&
                        validationConditions(condiciones);

        alert('VALIDATION: ' + validationAll);
    }, false); 
};

function validationNombre(nombre){
    var valid = true;
    if ((nombre == "") || (nombre.length <= 2)){
        valid = false;
        addAclass('fNombre','error-val');
        if (nombre == "") {
            displayMsg('errorNombre' , 'Ingrese un nombre no vacio');
        } else {
            displayMsg('errorNombre' , 'Ingrese un nombre con mas de dos caracteres');
        }  
    }
    return valid
}

function validationApellido(apellido){
    var valid = true;
    if ((apellido == "") || (apellido.length <= 2)){
        valid = false;
        addAclass('fApellido','error-val');
        if (apellido == "") {
            displayMsg('errorApellido' , 'Ingrese un apellido no vacio');
        } else {
            displayMsg('errorApellido' , 'Ingrese un apellido con mas de dos caracteres');
        }  
    }
    return valid
}

function validacionEmail(email){
    var valid = true;
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var correctSyntaxEmail = regex.test(email);
    if ((email == "") || (!correctSyntaxEmail)){
        valid = false;
        addAclass('fEmail','error-val');
        if(email == ""){
            displayMsg('errorEmail' , 'Ingrese un email no vacio');
        } else {
            displayMsg('errorEmail' , 'Ingrese un email correcto');
        }
    }
    return valid
}

function validationDepartamento(departamento){
    var valid = true;
    if (departamento == ""){
        valid = false;
        addAclass('departamento','error-val');
        displayMsg('errorDepartamento' , 'Seleccione un departamento');
    }
    return valid
}

function validationLocalidad(localidad){
    var valid = true;
    if (localidad == ""){
        valid = false;
        addAclass('localidad','error-val');
        displayMsg('errorLocalidad' , 'Seleccione una localidad');
    }
    return valid
}

function validationCI(ci){
    var ciN = ci.replace("-","");
    ci = plainNumber(ciN);
    var valid = true;
    if ((ci == "") || (!validarCedula(ci))){
        valid = false;
        addAclass('fCI','error-val');
        if (ci == ""){
            displayMsg('errorCi' , 'Ingrese un documento no vacio');
        } else {
            displayMsg('errorCi' , 'Ingrese un documento correcto');
        }
    }
    return valid
}

function validationConditions(condiciones){
    var valid = true;
    if (!condiciones){
        valid = false;
        addAclass('conditions','error-val');
        displayMsg('errorConditions' , 'Debe marcar si acepta las bases y condiciones');
    }
    return valid
}

