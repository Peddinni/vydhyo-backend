const Driver = require("./driver.schema");
const Partner = require("../partner/partner.schema");

console.log("Partner Collection:", Partner.collection.name);

const generateDriverId = require("../../common/helpers/generateDriverId");

class DriverService {

    async registerDriver(payload, userId) {

        console.log("\n================ DRIVER REGISTER ================");
console.log("Payload Received:");
console.log(payload);
console.log("Partner ID Received:", payload.partnerId);

console.log("\n========== PARTNER DEBUG ==========");

const allPartners = await Partner.find();

console.log("All Partners in MongoDB:");
console.log(allPartners);

console.log("====================================");
console.log("Partner ID received:", payload.partnerId);
console.log("Partner ID Type:", typeof payload.partnerId);

const partner = await Partner.findById(payload.partnerId);

console.log("Partner Result:");
console.log(partner);
console.log("====================================");

console.log("\nPartner By ID:");
console.log(partner);

const partnerWithDelete = await Partner.findOne({
    _id: payload.partnerId,
    isDeleted: false
});

console.log("\nPartner By ID + isDeleted:");
console.log(partnerWithDelete);

console.log("===================================\n");

if (!partnerWithDelete) {
    throw new Error("Partner not found.");
}
console.log("=================================================\n");

if (!partner) {
    throw new Error("Partner not found.");
}
        const existingMobile = await Driver.findOne({
            mobile: payload.mobile
        });

        if (existingMobile) {
            throw new Error("Mobile number already exists.");
        }

        const existingAadhaar = await Driver.findOne({
            aadhaarNumber: payload.aadhaarNumber
        });

        if (existingAadhaar) {
            throw new Error("Aadhaar number already exists.");
        }

        const existingLicense = await Driver.findOne({
            drivingLicenseNumber: payload.drivingLicenseNumber
        });

        if (existingLicense) {
            throw new Error("Driving license already exists.");
        }

        const driver = await Driver.create({

            driverId: generateDriverId(),

            partnerId: payload.partnerId,

            userId,

            fullName: payload.fullName,

            mobile: payload.mobile,

            email: payload.email,

            gender: payload.gender,

            dateOfBirth: payload.dateOfBirth,

            bloodGroup: payload.bloodGroup,

            aadhaarNumber: payload.aadhaarNumber,

            drivingLicenseNumber: payload.drivingLicenseNumber,

            experience: payload.experience

        });

        return driver;

    }

    async getDriver(id) {

        const driver = await Driver.findOne({

            _id: id,

            isDeleted: false

        })
        .populate("partnerId")
        .populate("userId", "-password");

        if (!driver) {

            throw new Error("Driver not found.");

        }

        return driver;

    }

    async updateDriver(id, payload) {

        const driver = await Driver.findOne({

            _id: id,

            isDeleted: false

        });

        if (!driver) {

            throw new Error("Driver not found.");

        }

        Object.assign(driver, payload);

        await driver.save();

        return driver;

    }

    async deleteDriver(id) {

        const driver = await Driver.findOne({

            _id: id,

            isDeleted: false

        });

        if (!driver) {

            throw new Error("Driver not found.");

        }

        driver.isDeleted = true;

        await driver.save();

        return driver;

    }

    async getAllDrivers() {

        return await Driver.find({

            isDeleted: false

        })
        .populate("partnerId")
        .populate("userId", "-password")
        .sort({
            createdAt: -1
        });

    }

}

module.exports = new DriverService();