const Ambulance = require("./ambulance.schema");
const Partner = require("../partner/partner.schema");

const generateAmbulanceId = require("../../common/helpers/generateAmbulanceId");

class AmbulanceService {

    async registerAmbulance(payload, userId) {

        const partner = await Partner.findOne({
            _id: payload.partnerId,
            isDeleted: false
        });

        if (!partner) {
            throw new Error("Partner not found.");
        }

        const existingVehicle = await Ambulance.findOne({
            vehicleNumber: payload.vehicleNumber.toUpperCase()
        });

        if (existingVehicle) {
            throw new Error("Vehicle number already exists.");
        }

        const ambulance = await Ambulance.create({

            ambulanceId: generateAmbulanceId(),

            partnerId: payload.partnerId,

            vehicleNumber: payload.vehicleNumber.toUpperCase(),

            vehicleType: payload.vehicleType,

            model: payload.model,

            manufacturer: payload.manufacturer,

            registrationDate: payload.registrationDate,

            insuranceExpiry: payload.insuranceExpiry,

            pollutionExpiry: payload.pollutionExpiry,

            fitnessExpiry: payload.fitnessExpiry,

            color: payload.color,

            seatingCapacity: payload.seatingCapacity,

            oxygenSupported: payload.oxygenSupported,

            ventilatorSupported: payload.ventilatorSupported,

            wheelchairSupported: payload.wheelchairSupported,

            stretcherSupported: payload.stretcherSupported,

            remarks: payload.remarks,

            userId

        });

        return ambulance;

    }

    async getAmbulance(id) {

        const ambulance = await Ambulance.findOne({

            _id: id,

            isDeleted: false

        })
        .populate("partnerId")
        .populate("userId", "-password");

        if (!ambulance) {

            throw new Error("Ambulance not found.");

        }

        return ambulance;

    }

    async getAllAmbulances() {

        return await Ambulance.find({

            isDeleted: false

        })
        .populate("partnerId")
        .populate("userId", "-password")
        .sort({
            createdAt: -1
        });

    }

    async updateAmbulance(id, payload) {

        const ambulance = await Ambulance.findOne({

            _id: id,

            isDeleted: false

        });

        if (!ambulance) {

            throw new Error("Ambulance not found.");

        }

        Object.assign(ambulance, payload);

        await ambulance.save();

        return ambulance;

    }

    async deleteAmbulance(id) {

        const ambulance = await Ambulance.findOne({

            _id: id,

            isDeleted: false

        });

        if (!ambulance) {

            throw new Error("Ambulance not found.");

        }

        ambulance.isDeleted = true;

        await ambulance.save();

        return ambulance;

    }

}

module.exports = new AmbulanceService();