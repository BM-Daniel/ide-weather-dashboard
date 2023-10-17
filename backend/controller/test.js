import { getCurrentWeather } from './weatherController.js';

async function runTest() {
    try {
        const location = 'Osu';

        const req = { params: { location } };
        const res = {
            status: code => {
                console.log('Status Code:', code);
                return res;
            },
            json: data => {
                console.log('Response Data:', data);
            },
        };

        await getCurrentWeather(req, res);
    } catch (error) {
        console.error('Error:', error);
    }
}

runTest();
