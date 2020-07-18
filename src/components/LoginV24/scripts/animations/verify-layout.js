import { applyStyle, delay } from "../utils";
import elements from "../elements";

async function verifyAnimation(whenVerified) {
    const {
        loginLayout,
        verifyLayout,
    } = elements;

    applyStyle(loginLayout, {
        transitionProperty: "all",
        transitionDuration: "1s",
        opacity: "0",
        transform: "scale(0)",
    });

    await delay(1000);

    const whenRespondProfile = whenVerified || Promise.resolve(null);

    try {
        await whenRespondProfile;
    }
    catch (error) {
        applyStyle(loginLayout, {
            transitionProperty: "all",
            transitionDuration: "1s",
            opacity: "1",
            transform: "scale(1)",
        });

        throw error;
    }

    applyStyle(verifyLayout, {
        transitionProperty: "all",
        transitionDuration: "0.8s",
        visibility: "visible",
        transform: "scale(1)",
        opacity: "1",
    });

    await delay(1600);

    applyStyle(verifyLayout, {
        transitionProperty: "all",
        transitionDuration: "1.2s",
        transform: "scale(0)",
        opacity: "0",
    });
}

export default verifyAnimation;
