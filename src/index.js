import connectDB from "./database/db.connect.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 4000

connectDB()
.then(() => {
    console.log("DB connected successfully!");

    app.listen(PORT, () => {
        console.log(`Server is listining on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.error("Error connecting to DB:", error);
    process.exit(1);  
})