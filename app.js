const fs = require('fs');
const db = require('./db.js');

const genders = db.genders;
const maleNames = db.maleNames;
const femaleNames = db.femaleNames;
const lastNames = db.lastNames;

const randChoice = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const generatePhoneNumber = () => {
  let phoneNumber = '';
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  phoneNumber += firstDigit.toString();

  for (let i = 0; i < 8; i++) {
    const remainingDigits = Math.floor(Math.random() * 10);
    phoneNumber += remainingDigits.toString();
  }

  return phoneNumber;  
};

const people = [];

for ( let i = 0; i < 20; i++ ){
  const person = {};

  person.gender = randChoice(genders);

  if (person.gender === 'male') {
    person.firstName = randChoice(maleNames);
  } else if (person.gender === 'female') {
    person.firstName = randChoice(femaleNames);
  }

  person.lastName = randChoice(lastNames);
  person.age = Math.floor(Math.random() * 61) + 18;
  person.email = `${person.firstName.toLowerCase()}.${person.lastName.toLowerCase()}@gmail.com`;
  person.phone = generatePhoneNumber();


  people.push(person);
};

console.log(people);

const json = JSON.stringify(people);

fs.writeFile('people.json', json, (err) => {
    if (err) {
      console.error('Error.');
      throw err;
    }
    console.log('The file has been saved!');
  });
