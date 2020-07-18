import { applyStyle } from "./utils";
import elements from "./elements";

/** 初始化 */
function initialize() {
    const {
        layoutContainer,
        verifyLayout,
        curves,
        bottomUpperLine,
        bottomLowerLine,
        bottomLeftLine,
        bottomRightLine,
        verticalRollingDots,
        progressCircles,
        outerProgressCircle,
        innerProgressCircle,
        systemAccessToImSystemTextBackground,
        systemAccessToImSystemText,
        systemVersionStraghtLinkModeText,
        systemMiddleLine,
        leftBracketText,
        rightBracketText,
        initializingText,
        finishedText,
        loginFormTopCover,
        loginFormLeftCover,
        loginFormRightCover,
        loginFormTopLine,
        loginFormBottomLine,
        loginFormHorizonRollingDots,
        loginFormSystemAccessToImSystemTextBackground,
        loginFormSystemAccessToImSystemText,
        loginFormSystemVersionStraghtLinkModeText,
        loginFormSystemMiddleLine,
        loginFormAccountFieldBackground,
        loginFormPasswordFieldBackground,
        accountFieldContainer,
        passwordFieldContainer,
        accountFieldAsterisk,
        passwordFieldAsterisk,
        accountField,
        passwordField,
        loginButton,
    } = elements;

    applyStyle(curves, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "scale(0.5)",
        transformOrigin: "633px 364px",
    });

    applyStyle(bottomUpperLine, {
        transitionProperty: "",
        transitionDuration: "",
        strokeDashoffset: "100.05px",
        strokeDasharray: "100.05px",
        transform: "translateX(50.025px)",
    });

    applyStyle(bottomLowerLine, {
        transitionProperty: "",
        transitionDuration: "",
        strokeDashoffset: "300.15px",
        strokeDasharray: "300.15px",
        transform: "translateX(150.075px)",
    });

    applyStyle(bottomLeftLine, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(-100.05px)",
    });

    applyStyle(bottomRightLine, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(100.05px)",
    });

    applyStyle(verticalRollingDots, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
    });

    applyStyle(progressCircles, {
        transitionProperty: "",
        transitionDuration: "",
        transformOrigin: "633px 364px",
        transform: "scale(0)",
    });

    applyStyle(outerProgressCircle, innerProgressCircle, {
        transitionProperty: "",
        transitionDuration: "",
        transformOrigin: "633px 364px",
        strokeDashoffset: "0px",
        strokeDasharray: "500px",
    });

    applyStyle(systemAccessToImSystemTextBackground, systemAccessToImSystemText, systemVersionStraghtLinkModeText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateY(8px)",
    });

    applyStyle(systemMiddleLine, {
        transitionProperty: "",
        transitionDuration: "",
        strokeDashoffset: "155px",
        strokeDasharray: "155px",
        transform: "translateX(77.5px)",
    });

    applyStyle(leftBracketText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(95px)",
    });

    applyStyle(rightBracketText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(-95px)",
    });

    applyStyle(initializingText, finishedText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
    });

    applyStyle(loginFormTopCover, loginFormLeftCover, loginFormRightCover, {
        transitionProperty: "",
        transitionDuration: "",
        display: "none",
    });

    applyStyle(loginFormTopLine, loginFormBottomLine, {
        transitionProperty: "",
        transitionDuration: "",
        transform: "translateX(658px) scaleX(0)",
    });

    applyStyle(loginFormSystemAccessToImSystemTextBackground, loginFormSystemAccessToImSystemText, loginFormSystemVersionStraghtLinkModeText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateY(8px)",
    });

    applyStyle(loginFormSystemMiddleLine, {
        transitionProperty: "",
        transitionDuration: "",
        strokeDashoffset: "155px",
        strokeDasharray: "155px",
        transform: "translateX(77.5px)",
    });

    applyStyle(loginFormHorizonRollingDots, {
        transitionProperty: "",
        transitionDuration: "",
        visibility: "hidden",
        transform: "translateX(485px)",
    });

    applyStyle(accountFieldContainer, passwordFieldContainer, loginFormAccountFieldBackground, loginFormPasswordFieldBackground, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(-513px)",
        transformOrigin: "center",
    });

    applyStyle(loginButton, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(129px)",
        transformOrigin: "center",
    });

    accountField.addEventListener("input", () => {
        accountField.value = accountField.value.replace(/[^\x20-\xff]/g, "");
        accountFieldAsterisk.value = "*".repeat(accountField.value.length);
    });

    passwordField.addEventListener("input", () => {
        passwordField.value = passwordField.value.replace(/[^\x20-\xff]/g, "");
        passwordFieldAsterisk.value = "*".repeat(passwordField.value.length);
    });

    applyStyle(verifyLayout, {
        transitionProperty: "",
        transitionDuration: "",
        transformOrigin: "center",
        transform: "scale(4)",
        opacity: "0",
    });

    applyStyle(layoutContainer, {
        display: "",
        transformOrigin: "center",
        transitionProperty: "all",
        transitionDuration: "1s",
    });

    const layoutContainerWidth = 1280;
    const layoutContainerHeight = 720;
    const initialWindowWidth = window.innerWidth;
    const initialWindowHeight = window.innerHeight;

    window.addEventListener("resize", () => {
        const windowWidth = Math.max(initialWindowWidth, window.innerWidth);
        const windowHeight = Math.max(initialWindowHeight, window.innerHeight);
        const widthRatio = windowWidth / layoutContainerWidth;
        const heightRatio = windowHeight / layoutContainerHeight;
        const scale = Math.min(widthRatio, heightRatio);
        // const rotatedWidthRatio = windowHeight / layoutContainerWidth;
        // const rotatedHeightRatio = windowWidth / layoutContainerHeight;
        // const rotatedScale = Math.min(rotatedWidthRatio, rotatedHeightRatio);

        // if (rotatedScale > scale) {
        //     layoutContainer.style.transform = `scale(${rotatedScale}) rotate(90deg)`;
        // }
        // else {
        layoutContainer.style.transform = `scale(${scale})`;
        // }
    });

    window.dispatchEvent(new Event("resize"));
}

export default initialize;
