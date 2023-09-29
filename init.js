
// Redirect to week schedule instead of appointments
if ((document.referrer == "https://www.digikabu.de") || (document.referrer == "https://www.digikabu.de/Main/TestRedirect")) {
    window.location.href = "https://www.digikabu.de/Stundenplan/Klasse";
}

if ((document.referrer == "https://digikabu.de") || (document.referrer == "https://digikabu.de/Main/TestRedirect")) {
    window.location.href = "https://digikabu.de/Stundenplan/Klasse";
}

// Define available hours
timeTable = [
    {
        start: [8, 30],
        end: [9, 15],
    },
    {
        start: [9, 15],
        end: [10, 0],
    },
    {
        start: [10, 0],
        end: [11, 0],
    },
    {
        start: [11, 0],
        end: [11, 45],
    },
    {
        start: [11, 45],
        end: [12, 30],
    },
    {
        start: [12, 30],
        end: [13, 15],
    },
    {
        start: [13, 15],
        end: [14, 0],
    },
    {
        start: [14, 0],
        end: [14, 45],
    },
    {
        start: [14, 45],
        end: [15, 30],
    },
    {
        start: [15, 30],
        end: [16, 15],
    },
];

// Define Parameters of extension
const refreshTimeout = 10000;
const hourOver = "grey";
const hourNow = "#7CBB00";

// function which loops infinitly
function startInfiniteLoop() {
    setTimeout(function() {
        timeTable.forEach(checkTime);
        startInfiniteLoop();
    }, refreshTimeout)
}
  
// Init if Webpage has loaded
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        console.log("BetterKabu running");
        const urlpath = window.location.pathname;
        // Only add colored hours if urlpath matches specific requirements
        if (urlpath.includes("SchulaufgabenPlan")) {
            markCurrentDay();
        }
        if (urlpath.includes("Stundenplan") || urlpath.includes("Main")) {
            setTimeout(() => {
                hidePassedDays();
                showTimer();
                timeTable.forEach(checkTime);
                startInfiniteLoop();
            }, 600); // Still add a 600ms delay since website still rendering
        }
    }
}

// function to convert time from time_table to date objects
function getTimeObject(hours, minutes) {
    let obj = new Date();
    obj.setHours(hours);
    obj.setMinutes(minutes);
    obj.setSeconds(0);
    return obj
}

// function to check if specific time window is met
function checkTime(item, index) {
    currentTime = new Date();
    const startTime = getTimeObject(item.start[0], item.start[1]);
    const endTime = getTimeObject(item.end[0], item.end[1]);

    let box;

    if (window.location.pathname.includes("Stundenplan")) {
        box = document.getElementById('umgebung').children[0];
    } else {
        box = document.getElementById('umgebung').children[0].children[1].children[0];
    }

    const currentBox = box.children[index];

    if (currentTime > endTime) {
        currentBox.children[0].classList.remove('weekdayToday');
        currentBox.children[1].style.fill = hourOver;
        currentBox.children[2].style.fill = hourOver;
        currentBox.children[3].style.fill = hourOver;
    } else if ((currentTime > startTime) && (currentTime < endTime)) {
        currentBox.children[0].classList.add('weekdayToday');

    }
}

function showTimer() {
  if (window.location.pathname.includes("Stundenplan")) {

    const box = document.getElementById("stdplanheading");

    const html = `
      <div id="timer" style="display: flex">
        <h3>Stunden Timer</h3>
        <span class="timerText">0m 0s</span>
      </div>
    `;

    box.outerHTML += html;

    // Helper function to update the timer display
    function updateTimerDisplay(minutes, seconds) {
      const timerText = `${minutes}m ${seconds}s`;
      document.querySelector("#timer .timerText").textContent = timerText;
    }

    // Helper function to calculate time difference
    function calculateTimeDiff() {
      const currentTime = new Date();

      // Find the next lesson start time
      let nextLessonStart;
      for (let i = 0; i < timeTable.length; i++) {
        const startTime = getTimeObject(timeTable[i].start[0], timeTable[i].start[1]);
        if (currentTime < startTime) {
          nextLessonStart = startTime;
          break;
        }
      }

      // Calculate the time difference
      const timeDiff = Math.max(nextLessonStart - currentTime, 0);
      const minutes = Math.floor(timeDiff / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);

      updateTimerDisplay(minutes, seconds);
    }

    // Initial update of the timer
    calculateTimeDiff();

    // Update the timer every second (1000ms)
    setInterval(calculateTimeDiff, 1000);
  }
}



function hidePassedDays() {
    let box;

    if (window.location.pathname.includes("Stundenplan")) {
        box = document.getElementById('umgebung');
        for (let i = 1; i < 5; i++) {
            if (box.children[i].children[0].children[0].classList.contains('weekdayToday')) {
                break
            } else {
                box.children[i].children[0].children[1].classList.add('passedDay');
            }
        }
    }
}

function markCurrentDay() {
    var today = new Date(),
    day = String(today.getDate()).padStart(2, "0"),
    month = String(today.getMonth() + 1).padStart(2, "0"),
    date = day + "." + month + ".";

    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var strongs = tables[i].getElementsByTagName("strong");
        for (var j = 0, len = strongs.length; j < len; j++) {
            var strong = strongs[j];
            if (strong.textContent.includes(date)) {
                strong.closest("tr").style.backgroundColor = "#4281ff";
                return;
            }
        }
    }
}
