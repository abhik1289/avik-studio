

type serverConfig = {
   mode: "development" | "production";
   dbUrl: string;
mainUrl: string;
};


export const serverConfig: serverConfig = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    dbUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/avik-studio",
    mainUrl: process.env.MAIN_URL || "http://localhost:3000",
}

