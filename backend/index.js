import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// Hapus komentar dibawah ketika menjalankan aplikasi pertama kali untuk generate tabel product dan users pertama kali
// Lalu beri komentar lagi ketika sudah tergenerate

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' //jika ada port lain, maka ditutup dulu
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// Hapus komentar dibawah ketika menjalankan aplikasi pertama kali untuk generate tabel session pertama kali
// Lalu beri komentar lagi ketika sudah tergenerate
// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
