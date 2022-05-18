let rentalSearchResults = [];

for (let i = 0; i < 5; i++) {
  rentalSearchResults.push({
    id: "" + i,
    date: "2022-01-03",
    address: "Barrone LLddsssssssssssssC.",
    city: "Kalamazoo, MI",
    state: "Michigan",
    zipcode: "EIO223",
    landlord_rent: 1000,
    landlord_name: "Tom Gray",
    landlord_contact: "+1 123 3532 3422",
    airdna_adr: 111,
    airdna_occupancy: 40,
    beds: 2,
    baths: 3,
    square_footage: 400
  });
}

const mock = {
  rentalSearchResults,
  secondTable: []
}

export default mock;