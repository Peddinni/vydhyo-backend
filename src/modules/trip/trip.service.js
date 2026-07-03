const Trip = require("./trip.schema");
const generateTripId = require("../../common/helpers/generateTripId");

const createTrip = async (payload) => {
    const trip = await Trip.create({
        tripId: generateTripId(),
        ...payload
    });

    return await Trip.findById(trip._id)
        .populate("bookingId")
        .populate("partnerId")
        .populate("ambulanceId")
        .populate("driverId")
        .populate("userId");
};

const getTrips = async () => {
    return await Trip.find({
        isDeleted: false
    })
        .populate("bookingId")
        .populate("partnerId")
        .populate("ambulanceId")
        .populate("driverId")
        .populate("userId")
        .sort({ createdAt: -1 });
};

const getTripById = async (id) => {
    return await Trip.findOne({
        _id: id,
        isDeleted: false
    })
        .populate("bookingId")
        .populate("partnerId")
        .populate("ambulanceId")
        .populate("driverId")
        .populate("userId");
};

const updateTrip = async (id, payload) => {
    await Trip.findByIdAndUpdate(id, payload, {
        new: true
    });

    return await getTripById(id);
};

const deleteTrip = async (id) => {
    await Trip.findByIdAndUpdate(id, {
        isDeleted: true
    });

    return await Trip.findById(id);
};

module.exports = {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
    deleteTrip
};