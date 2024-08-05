// import { ServerApplication } from "@application/ServerApplication";

import { ServerApplication } from "@application/ServerApplication";


async function runApplication() : Promise<void> {
    const serverApplication : ServerApplication = ServerApplication.new();
    await serverApplication.run();
}

(async () : Promise<void> {
    await runApplication();
})()