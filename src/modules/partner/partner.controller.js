const PartnerService = require("./partner.service");
const ApiResponse = require("../../common/responses/apiResponse");

class PartnerController {

    async register(req, res) {

        try {

            const partner = await PartnerService.registerPartner(
                req.user._id,
                req.body
            );

            return ApiResponse.success(
                res,
                "Partner registered successfully.",
                partner,
                201
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async getById(req, res) {

        try {

            const partner = await PartnerService.getPartnerById(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Partner fetched successfully.",
                partner
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                404
            );

        }

    }

    async update(req, res) {

        try {

            const partner = await PartnerService.updatePartner(
                req.params.id,
                req.body
            );

            return ApiResponse.success(
                res,
                "Partner updated successfully.",
                partner
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async getAll(req, res) {

        try {

            const partners = await PartnerService.getPartners(
                req.query
            );

            return ApiResponse.success(
                res,
                "Partners fetched successfully.",
                partners
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async changeStatus(req, res) {

        try {

            const partner = await PartnerService.changePartnerStatus(
                req.params.id,
                req.body.status
            );

            return ApiResponse.success(
                res,
                "Partner status updated successfully.",
                partner
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async delete(req, res) {

        try {

            const partner = await PartnerService.deletePartner(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Partner deleted successfully.",
                partner
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

}

module.exports = new PartnerController();