function detectChar(){
    const input = document.getElementById("inputText").value;

    if(input){
        const unicodeValue = input.charCodeAt(0);
        const result = `The Unicode value of "${input}" is ${unicodeValue}`;
        document.getElementById('output').textContent = result;
    }else{
        document.getElementById('output').textContent = 'Please enter a character'
    }
}