const paragraphs = [
    `Wishing You Peace and Happiness - May peace and happiness fill your life every single day. No matter how busy or challenging life gets, I hope you always find a moment to breathe and cherish the beauty around you. Let positivity guide your steps and brighten your path. Remember, a calm mind leads to a stronger heart and a clearer vision for the future. Keep smiling, and let joy accompany you wherever you go.`,
    `Good Health Always - Your health is your greatest asset. I wish you a life filled with vitality and strength, so you can achieve all your dreams and aspirations. May you wake up each day feeling refreshed, energized, and ready to embrace the opportunities ahead. Take care of your body and mind, and always prioritize your well-being. Stay healthy, stay strong, and let your inner light shine.`,
    `Success in All Your Endeavors - I hope all your efforts bear fruit and lead you closer to your goals. Whether it’s your career, personal projects, or dreams, may every step you take be a step towards success. Stay focused and confident, and remember that challenges are just opportunities in disguise. Believe in yourself, and the world will believe in you too.`,
    `Smooth Sailing in Life - Life can be unpredictable, but I wish you a journey free of unnecessary troubles and obstacles. May every plan you make come to fruition, and may every challenge you face be met with grace and wisdom. Trust in your abilities and stay resilient, knowing that smoother days always follow rough patches. Keep moving forward with hope and determination.`,
    `Strength for Every Challenge - I hope you have the strength to overcome any challenges that come your way. Life is not always easy, but your courage and determination will guide you through. Remember, tough times don’t last, but tough people do. Stay brave, stay hopeful, and let every difficulty teach you a valuable lesson that makes you stronger than before.`,
    `Joy and Fulfillment - May your days be filled with joy and a sense of fulfillment. I hope you find happiness not only in achieving great things but also in the simple moments of everyday life. Cherish your relationships, celebrate your progress, and never lose sight of the things that truly matter. A heart full of gratitude and love is a heart that’s truly rich.`,
    `Opportunities and Growth - I wish you endless opportunities to learn, grow, and thrive. May new doors open for you at the right moments, leading you to greater heights. Embrace change, take on new challenges, and never stop believing in your potential. With every step forward, may you feel more confident, capable, and ready to conquer whatever lies ahead.`,
    `Contentment and Peace of Mind - Finally, I wish you contentment in your heart and peace of mind. No matter where life takes you, may you always find balance and harmony. Let go of worries that don’t serve you and hold on to the moments that bring you joy. Remember, true happiness lies not in what you have but in how you feel. Be at peace with yourself and the world around you.`
];
const item = document.getElementById("items");
const dataContainer = document.getElementById("data");

function shuffle(array){
    let currentIndex = array.length;
    let randomIndex;

    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex],array[randomIndex]] = [array[randomIndex],array[currentIndex]];
    }

    return array;
}

function generate(){
    if(item.value == 0){
        alert("The value cannot be 0");
    }else if(item.value > paragraphs.length){
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        dataContainer.innerHTML = `${paragraphs[randomIndex]}`;
    }else{
        const shuffledParagraphs = paragraphs;
        shuffle(paragraphs);

        const selectedParagraph = shuffledParagraphs.slice(0,item.value)

        const paragraphHTML = selectedParagraph.map(paragraphs => `<p>${paragraphs}</p>`).join("");
        dataContainer.innerHTML = paragraphHTML;
    }
}
