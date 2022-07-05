

if ((document.referrer == "https://www.digikabu.de") || (document.referrer == "https://www.digikabu.de/Main/TestRedirect")) {
    window.location.href = "https://www.digikabu.de/Stundenplan/Klasse";
}

if ((document.referrer == "https://digikabu.de") || (document.referrer == "https://digikabu.de/Main/TestRedirect")) {
    window.location.href = "https://digikabu.de/Stundenplan/Klasse";
}

timeTable = [
    {
        start: [[8],[30]],
        end: [[9],[15]],
    },
    {
        start: [[9],[15]],
        end: [[10],[0]],
    },
    {
        start: [[10],[0]],
        end: [[11],[0]],
    },
    {
        start: [[11],[0]],
        end: [[11],[45]],
    },
    {
        start: [[11],[45]],
        end: [[12],[30]],
    },
    {
        start: [[12],[30]],
        end: [[13],[15]],
    },
    {
        start: [[13],[15]],
        end: [[14],[0]],
    },
    {
        start: [[14],[0]],
        end: [[14],[45]],
    },
    {
        start: [[14],[45]],
        end: [[15],[30]],
    },
    {
        start: [[15],[30]],
        end: [[16],[15]],
    },
];

const refreshTimeout = 3500;
const hourOver = "grey";
const hourNow = "green";
const hourNext = "orange";

document.onreadystatechange = () => {
    console.log("Darkikabu active");
    timeTable.forEach(checkTime);
}


function getTimeObject(hours, minutes) {
    let obj = new Date();
    obj.setHours(hours);
    obj.setMinutes(minutes);
    obj.setSeconds(0);
    return obj
}

function checkTime(item, index) {
    currentTime = new Date();
    const startTime = getTimeObject(item.start[0], item.start[1]);
    const endTime = getTimeObject(item.end[0], item.end[1]);

    if ((currentTime > startTime) && (currentTime < endTime)) {
        document.querySelector("#umgebung > div.hidden-xs > div > svg:nth-child(1) > g:nth-child("+(index+1)+") > text:nth-child(2)").style.fill = hourNow;
        document.querySelector("#umgebung > div.hidden-xs > div > svg:nth-child(1) > g:nth-child("+(index+1)+") > text:nth-child(3").style.fill = hourNow;
        document.querySelector("#umgebung > div.hidden-xs > div > svg:nth-child(1) > g:nth-child("+(index+1)+") > text:nth-child(4)").style.fill = hourNow;

    }

    //console.log(item.start, index);
}