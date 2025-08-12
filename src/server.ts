import app from './config/app';
import { env } from './config/constants';
import { dbConnection } from './config/database';
import './workers/content.worker'; 

(async () => {
    await dbConnection();

    const port = env.PORT;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
    });
})();
