const genBtn = document.getElementById("rdNumb")
const numb = document.getElementById("random-number");

genBtn.addEventListener("click", () => {
  const randomNumb = Math.floor(Math.random() * 100) + 1;
  numb.textContent = randomNumb;
});