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

