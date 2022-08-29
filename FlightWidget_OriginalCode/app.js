const tableBody = document.getElementById("table-body");

let flights = [
  {
    time: "08:11",
    destination: "OMAN",
    flight: "OX 203",
    gate: "A 01",
    remarks: "ON TIME",
  },
  {
    time: "12:39",
    destination: "LONDON",
    flight: "CL 320",
    gate: "C 31",
    remarks: "CANCELLED",
  },
  {
    time: "13:21",
    destination: "DUBAI",
    flight: "DXB 201",
    gate: "A 19",
    remarks: "CANCELLED",
  },
  {
    time: "14:01",
    destination: "FRANKFURT",
    flight: "FR 402",
    gate: "B 02",
    remarks: "ON TIME",
  },
  {
    time: "15:22",
    destination: "TOKYO",
    flight: "TK 211",
    gate: "A 32",
    remarks: "DELAYED",
  },
];

// Add more destinations and status
const destinations = [
  "TOKYO",
  "FRANKFURT",
  "DUBAI",
  "LONDON",
  "OMAN",
  "BEIRUT",
  "SIBIU",
  "BUCHAREST",
];
const remarks = [
  "ON TIME",
  "DELAYED",
  "CANCELLED",
  "LANDING",
  "CHECK-IN",
  "BOARDING",
  "TAKE-OFF",
];

let hour = 15;

// Add digital clock code

// const hours = document.getElementById('hours');
// const minutes = document.getElementById('minutes');
// const seconds = document.getElementById('seconds');

// const digitalClock = setInterval(function digital() {

//   let dateToday = new Date();
//   let hr = dateToday.getHours();
//   let min = dateToday.getMinutes();
//   let sec = dateToday.getSeconds();

//   if(hr < 10) {
//     hr = '0' + hr;
//   }

//   if(min < 10) {
//     min = '0' + min;
//   }

//   if(sec < 10) {
//     sec = '0' + sec;
//   }

//   hours.textContent = hr;
//   minutes.textContent = min;
//   seconds.textContent = sec;
// }, 1000);

// Add analog clock code

const secondsHand = document.getElementById("seconds-hand");
const minutesHand = document.getElementById("minutes-hand");
const hoursHand = document.getElementById("hours-hand");

function getTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const timeInterval = 6;

  // console.log(now)
  // console.log(seconds * timeInterval)
  // console.log(minutes * timeInterval + seconds / 10)
  // console.log(hours * 30 + minutes / 2)

  secondsHand.style.transform = `rotate(${seconds * timeInterval}deg)`;
  minutesHand.style.transform = `rotate(${
    minutes * timeInterval + seconds / 10
  }deg)`;
  hoursHand.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;
}

setInterval(getTime, 100);

function populateTable() {
  for (const flight of flights) {
    const tableRow = document.createElement("tr");

    for (const flightDetail in flight) {
      const tableCell = document.createElement("td");
      const word = Array.from(flight[flightDetail]);

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement("div");

        setTimeout(() => {
          letterElement.classList.add("flip");
          letterElement.textContent = letter;
          tableCell.append(letterElement);
        }, 100 * index);
      }
      tableRow.append(tableCell);
    }

    tableBody.append(tableRow);
  }
}

populateTable();

function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generateRandomNumber(maxNumber) {
  const numbers = "0123456789";
  if (maxNumber) {
    const newNumbers = numbers.slice(0, maxNumber + 1);
    return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length));
  }
  return numbers.charAt(Math.floor(Math.random() * numbers.length));
}

function generateTime() {
  let displayHour = hour;

  if (hour < 24) {
    hour++;
  }
  if (hour >= 24) {
    hour = 1;
    displayHour = hour;
  }
  if (hour < 10) {
    displayHour = "0" + hour;
  }

  return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber();
}

function shuffleUp() {
  flights.shift();
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight:
      generateRandomLetter() +
      generateRandomLetter() +
      " " +
      generateRandomNumber() +
      generateRandomNumber(),
    gate:
      generateRandomLetter() +
      " " +
      generateRandomNumber() +
      generateRandomNumber(),
    remarks: remarks[Math.floor(Math.random() * remarks.length)],
  });
  tableBody.textContent = "";
  populateTable();
}

setInterval(shuffleUp, 5000);
