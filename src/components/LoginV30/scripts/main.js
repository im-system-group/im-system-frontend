import { whenUserPressKeyOrClickPage, whenUserFilledOutFormAndPressEnter } from "./utils";
import initialize from "./initialize";
import welcomeAnimation from "./animations/welcome-layout";
import loginAnimation from "./animations/login-layout";
import verifyAnimation from "./animations/verify-layout";
import diveAnimation from "./animations/dive-layout";

async function main(whenLogin) {
    initialize();
    await welcomeAnimation();
    await whenUserPressKeyOrClickPage();
    await loginAnimation();

    for (; ;) {
        try {
            const form = await whenUserFilledOutFormAndPressEnter();
            await verifyAnimation(whenLogin(form));
            break;
        }
        catch (error) {
            console.log(error);
        }
    }

    await diveAnimation();
}

export default main;
