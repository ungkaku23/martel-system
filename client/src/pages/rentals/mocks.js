let rentalSearchResults = [];

for (let i = 0; i < 5; i++) {
  rentalSearchResults.push({
    id: "" + i,
    date: "2022-01-03",
    address: "Barrone LLddsssssssssssssC.",
    city: "Kalamazoo, MI",
    state: "Michigan",
    zip: "EIO223"
  });
}

const mock = {
  rentalSearchResults,
  secondTable: []
}

export default mock;