document.addEventListener("DOMContentLoaded",function(){
    const valueNumb = document.getElementById("check-number");
    const btnCheck = document.getElementById("btn-check");
    const resultMessage = document.getElementById("result");

    btnCheck.addEventListener("click", function(){
        const number = parseInt(valueNumb.value);

        if(isNaN(number))
        {
            resultMessage.textContent= "Please enter a number!!"
            resultMessage.style.color= "red";
            return;
        }
        else if(isPrime(number)){
            resultMessage.textContent=`${number} is a prime number`;
            resultMessage.style.color="green";
        }else{
            resultMessage.textContent=`${number} is not a prime number`;
            resultMessage.style.color="red";
        }
    })

    function isPrime(num){
        if(num<=1) return false;
        if(num<=3) return true;

        if(num%2==0 || num%3==0) return false;
        return true;
    }
})
