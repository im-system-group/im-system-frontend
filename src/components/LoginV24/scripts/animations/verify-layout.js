import { applyStyle, delay } from "../utils";
import elements from "../elements";

async function verifyAnimation() {
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

    applyStyle(verifyLayout, {
        transitionProperty: "all",
        transitionDuration: "0.8s",
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
