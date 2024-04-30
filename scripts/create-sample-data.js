const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const mongoClient = new MongoClient("mongodb://localhost:27017/");

async function insertSampleData() {
    try {
        const dbObj = mongoClient.db("test");
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const password = await bcrypt.hash("Abcd@123", salt);
        const insertedAdmin = await dbObj.collection("users").insertOne({
            name: "Datta",
            email: "dalestyn1998@gmail.com",
            address: "Ganesh nagar, beside sangeetha mobiles",
            mobile: {
                country: "IN",
                countryCode: "+91",
                number: "7989374094",
            },
            gender: 'MALE',
            isOwner: true,
            isRepresentative: true,
            role: 'DEVELOPER',
            community: null,
            status: 'VERIFIED',
            displayOrShareSensitiveDetails: true,
            password,
        });
        const communityDetails = {
            name: "Developers",
            address: "Ganesh nagar, beside sangeetha mobiles",
            country: "IN",
            state: "Telangana",
            city: "Hyderabad",
            pincode: 500013,
            area: "ramanthapur",
            verifiedBy: insertedAdmin.insertedId,
            representative: insertedAdmin.insertedId
        }
        const insertedCommunity = await dbObj.collection("communities").insertOne(communityDetails);
    } finally {
        await mongoClient.close();
    }
}

insertSampleData().catch(console.dir)