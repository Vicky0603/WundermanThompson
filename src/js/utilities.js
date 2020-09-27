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