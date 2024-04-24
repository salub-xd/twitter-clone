import { initServer } from './app'
// console.log("Hellow");

async function init() {
    const app = await initServer();

    app.listen(8000, () => {
        console.log(`Server is running on 8000`);
    });
}

init();