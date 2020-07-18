import { whenUserFilledOutFormAndPressEnterOrClickLoginButton } from "./utils";
import initialize from "./initialize";
import initializeAnimation from "./animations/initialize-layout";
import loginAnimation from "./animations/login-layout";
import verifyAnimation from "./animations/verify-layout";

async function main() {
    initialize();
    await initializeAnimation();
    await loginAnimation();
    await whenUserFilledOutFormAndPressEnterOrClickLoginButton();
    await verifyAnimation();
}

export default main;
