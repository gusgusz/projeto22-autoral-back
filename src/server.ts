import app, { init } from "./app";

const port = process.env.PORT || 5000;

init().then((expressApp) => {
    expressApp.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to initialize the server:", error);
});
