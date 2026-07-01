const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./auth.schema");

const generateUserId = require("../../common/helpers/generateUserId");

class AuthService {

    async registerUser(payload) {

        const {
            fullName,
            mobile,
            email,
            password,
            role
        } = payload;

        const existingMobile = await User.findOne({ mobile });

        if (existingMobile) {
            throw new Error("Mobile number already registered.");
        }

        if (email) {

            const existingEmail = await User.findOne({
                email: email.toLowerCase()
            });

            if (existingEmail) {
                throw new Error("Email already registered.");
            }

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            userId: generateUserId(),

            fullName,

            mobile,

            email: email ? email.toLowerCase() : null,

            password: hashedPassword,

            role,

            isVerified: true

        });

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );

        return {

            token,

            user: {

                id: user._id,

                userId: user.userId,

                fullName: user.fullName,

                mobile: user.mobile,

                email: user.email,

                role: user.role

            }

        };

    }

    async loginUser(payload) {

        const {

            mobile,

            password

        } = payload;

        const user = await User.findOne({ mobile });

        if (!user) {
            throw new Error("Invalid mobile number.");
        }

        if (user.status !== "ACTIVE") {
            throw new Error("User account is inactive.");
        }

        const passwordMatched = await bcrypt.compare(

            password,

            user.password

        );

        if (!passwordMatched) {
            throw new Error("Invalid password.");
        }

        user.lastLogin = new Date();

        await user.save();

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );

        return {

            token,

            user: {

                id: user._id,

                userId: user.userId,

                fullName: user.fullName,

                mobile: user.mobile,

                email: user.email,

                role: user.role

            }

        };

    }

    async getUserById(id) {

        return await User.findById(id).select("-password");

    }

}

module.exports = new AuthService();