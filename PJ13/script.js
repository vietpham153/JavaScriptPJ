const password = document.getElementById("password");
const message = document.getElementById("message");
const strength = document.getElementById("strength");
const submitBtn = document.querySelector("button");
const eyeicon = document.getElementById("eye-icon");


password.addEventListener("input",function(){
    const passwordValue = password.value;
    const passwordLength = passwordValue.length;

    let strengthValue ='';

    if(password === 0){
        strengthValue = '';
    }else if(passwordLength < 6){
        strengthValue = 'Weak'
    }else if(passwordLength < 10){
        strengthValue = 'Medium'
    }else{
        strengthValue = 'Strong'
    }

    strength.textContent = strengthValue;
    message.style.display = "block" //display message.



});


submitBtn.addEventListener("click", function(){

    const passwordType = password.getAttribute('type');

    if(passwordType === 'password'){
        password.setAttribute('type','text')
        eyeicon.classList.remove("fa-eye-slash");
        eyeicon.classList.add("fa-eye");    
    }else{
        password.setAttribute('type','password')
        eyeicon.classList.remove("fa-eye");
        eyeicon.classList.add("fa-eye-slash");
    }

})