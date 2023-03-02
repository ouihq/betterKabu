const letters = "AaBbCsDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
let interval = null;

// Add an event listener to the "mouseover" event of the "h1" element
document.addEventListener('mouseover', event => {
    // Check if the target element is an "h1" element
    if (event.target.tagName.toLowerCase() === 'h3') {
        let iteration = 0;
        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if(iteration >= event.target.dataset.value.length){
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    }
});
