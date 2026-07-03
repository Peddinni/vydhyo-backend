const Partner = require("./partner.schema");
const { v4: uuid } = require("uuid");

class PartnerService {

    async registerPartner(userId, payload) {

        const {
            companyName,
            ownerName,
            mobile,
            email,
            gstNumber,
            panNumber,
            address,
            city,
            state,
            pincode
        } = payload;

        const existingPartner = await Partner.findOne({
            mobile,
            isDeleted: false
        });

        if (existingPartner) {
            throw new Error("Partner already exists with this mobile number.");
        }

        const partner = await Partner.create({
            partnerId: `PRT-${uuid().replace(/-/g, "").substring(0, 10).toUpperCase()}`,
            userId,
            companyName,
            ownerName,
            mobile,
            email: email ? email.toLowerCase() : null,
            gstNumber,
            panNumber,
            address,
            city,
            state,
            pincode
        });

        return partner;
    }

    async getPartnerById(id) {

        const partner = await Partner.findOne({
            _id: id,
            isDeleted: false
        }).populate("userId", "-password");

        if (!partner) {
            throw new Error("Partner not found.");
        }

        return partner;
    }

    async updatePartner(id, payload) {

        const partner = await Partner.findOne({
            _id: id,
            isDeleted: false
        });

        if (!partner) {
            throw new Error("Partner not found.");
        }

        Object.assign(partner, payload);

        await partner.save();

        return partner;
    }

    async getPartners(query) {

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {
            isDeleted: false
        };

        if (query.status) {
            filter.status = query.status;
        }

        if (query.search) {

            filter.$or = [
                {
                    companyName: {
                        $regex: query.search,
                        $options: "i"
                    }
                },
                {
                    ownerName: {
                        $regex: query.search,
                        $options: "i"
                    }
                },
                {
                    mobile: {
                        $regex: query.search,
                        $options: "i"
                    }
                }
            ];

        }

        const total = await Partner.countDocuments(filter);

        const partners = await Partner.find(filter)
            .populate("userId", "-password")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            partners
        };

    }

    async changePartnerStatus(id, status) {

        const partner = await Partner.findOne({
            _id: id,
            isDeleted: false
        });

        if (!partner) {
            throw new Error("Partner not found.");
        }

        partner.status = status;

        await partner.save();

        return partner;

    }

    async deletePartner(id) {

        const partner = await Partner.findOne({
            _id: id,
            isDeleted: false
        });

        if (!partner) {
            throw new Error("Partner not found.");
        }

        partner.isDeleted = true;

        await partner.save();

        return partner;

    }

}

module.exports = new PartnerService();