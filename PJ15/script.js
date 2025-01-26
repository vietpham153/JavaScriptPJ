
let intervalId;
function caculateAge(){

    const today = new Date();
    const birthdateInput =  document.getElementById("bỉrthdate").value;
    const birthdateParts = birthdateInput.split("-");
    const birthDay = birthdateParts[0];
    const birthMonth = birthdateParts[1] -1;
    const birthYear = birthdateParts[2];
    const birthDate = new Date(birthYear,birthMonth,birthDay); 

    // console.log(birthdateInput);
    // console.log(birthdateParts);
    // console.log(birthDay);
    // console.log(birthMonth);
    // console.log(birthYear);
    // console.log(birthDate);

    const isValidDate = (date) =>{
        return (
            Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)
        );
    }

    if(!isValidDate(birthDate)){
        alert("Invalid Date Format:Please Enter a valid date in DD-MM-YYYY format");
        return;
    }

    const ageInMilliseconds = today - birthDate;
    const ageInSeconds = Math.floor(ageInMilliseconds/1000);
    const ageInMinutes = Math.floor(ageInSeconds/60);
    const ageInHours = Math.floor(ageInMinutes/60);
    const ageInDays = Math.floor(ageInHours/24);
    const ageInWeeks = Math.floor(ageInDays/7);
    const ageInMonths = Math.floor(ageInDays/30.436875); // some months have 31 days and some months have 30 days then i random this number
    const ageInYears = Math.floor(ageInDays/365.25); // some years have 365 days and some years have 366 days
    const resultContainer = document.getElementById('resultContainer');
    const result = document.getElementById('result');
    result.innerHTML = `
        <div class="result-item">
            <h3>Age:</h3>
            <p>${ageInYears} years ${ageInMonths%12} months ${ageInDays%30} days</p>
        </div>
        <div class="result-item">
            <h3>Months Passed:</h3>
            <p> ${ageInMonths}</p>
        </div>
        <div class="result-item">
            <h3>Weeks Passed:</h3>
            <p>${ageInWeeks}</p>
        </div>
        <div class="result-item">
            <h3>Days Passed:</h3>
            <p>${ageInDays}</p>
        </div>
        <div class="result-item">
            <h3>Hours Passed:</h3>
            <p>${ageInHours}</p>
        </div>
        <div class="result-item">
            <h3>Minutes Passed:</h3>
            <p>${ageInMinutes}</p>
        </div>
        <div class="result-item">
            <h3>Seconds Passed:</h3>
            <p>${ageInSeconds}</p>
        </div>
    `

    resultContainer.style.display = "block";
   
    

    // console.log(ageInMilliseconds);
    

}

const ageCalculatorForm = document.getElementById("ageCalculator");
ageCalculatorForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = setInterval(caculateAge, 1000);
    caculateAge();
 });