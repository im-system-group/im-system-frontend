import { whenUserPressKeyOrClickPage, whenUserFilledOutFormAndPressEnter } from "./utils";
import initialize from "./initialize";
import welcomeAnimation from "./animations/welcome-layout";
import loginAnimation from "./animations/login-layout";
import verifyAnimation from "./animations/verify-layout";
import diveAnimation from "./animations/dive-layout";

async function main() {
    initialize();
    await welcomeAnimation();
    await whenUserPressKeyOrClickPage();
    await loginAnimation();
    await whenUserFilledOutFormAndPressEnter();
    await verifyAnimation();
    await diveAnimation();
}

export default main;
