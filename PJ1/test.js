const btnElement = document.querySelector('button');
const spanElement = document.getElementById('updateContent');

btnElement.onclick = function() {

    const yourName = prompt('please enter your name:');
    spanElement.textContent = yourName;
}
