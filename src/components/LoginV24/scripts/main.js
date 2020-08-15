import { whenUserFilledOutFormAndPressEnterOrClickLoginButton } from "./utils";
import initialize from "./initialize";
import initializeAnimation from "./animations/initialize-layout";
import loginAnimation from "./animations/login-layout";
import verifyAnimation from "./animations/verify-layout";

async function main(whenLogin) {
    initialize();
    await initializeAnimation();
    await loginAnimation();

    for (; ;) {
        try {
            const form = await whenUserFilledOutFormAndPressEnterOrClickLoginButton();
            await verifyAnimation(whenLogin(form));
            break;
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default main;
