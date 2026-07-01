const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`
=========================================
✅ MongoDB Connected Successfully
📂 Database : ${connection.connection.name}
🌐 Host     : ${connection.connection.host}
=========================================
`);
    } catch (error) {
        console.error(`
=========================================
❌ MongoDB Connection Failed
${error.message}
=========================================
`);
        process.exit(1);
    }
};

module.exports = connectDatabase;