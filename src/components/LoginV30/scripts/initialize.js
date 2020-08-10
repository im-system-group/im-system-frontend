import { applyStyle, formatToTimeText } from "./utils";
import elements from "./elements";

/** 初始化 */
function initialize() {
    const {
        layoutContainer,
        innerLeftArrow,
        innerRightArrow,
        outerLeftArrow,
        outerRightArrow,
        leftWelcomeText,
        rightWelcomeText,
        timeText,
        leftLoginText,
        rightLoginText,
        polylines,
        rollingDots,
        accountFieldContainer,
        passwordFieldContainer,
        accountFieldBackground,
        passwordFieldBackground,
        accountFieldAsterisk,
        passwordFieldAsterisk,
        accountField,
        passwordField,
        leftVerifyText,
        rightVerifyText,
        ipAndSystemTexts,
        versionAndModeTexts,
        topLeftShortLines,
        topLeftShortLine2,
        topLeftShortLine3,
        topRightShortLines,
        topRightShortLine2,
        topRightShortLine3,
        bottomLeftShortLines,
        bottomLeftShortLine2,
        bottomLeftShortLine3,
        bottomRightShortLines,
        bottomRightShortLine2,
        bottomRightShortLine3,
        analyzeView,
        leftBigCurve,
        rightBigCurve,
        leftDiveText,
        rightDiveText,
        accessText,
        leftDiveStatus,
        rightDiveStatus,
    } = elements;

    applyStyle(innerLeftArrow, outerLeftArrow, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateX(-${7 * 2}px)`,
    });

    applyStyle(innerRightArrow, outerRightArrow, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateX(${7 * 2}px)`,
    });

    applyStyle(leftWelcomeText, rightWelcomeText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateY(-16px)`,
    });

    applyStyle(leftLoginText, rightLoginText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateY(-14px)`,
    });

    applyStyle(timeText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "skew(30deg, 0deg)",
        transformOrigin: "center",
    });

    /** 更新時間文字 */
    const updateTimeText = () => {
        if (!elements.timeText) {
            return clearInterval(updateTimeTextTimer);
        }

        /** 現在時間 */
        const now = new Date();

        /** 格式過的時間文字 */
        const formattedTimeText = formatToTimeText(now);

        timeText.textContent = formattedTimeText;
    };

    updateTimeText();
    const updateTimeTextTimer = setInterval(updateTimeText, 1000);

    applyStyle(polylines, {
        transitionProperty: "",
        transitionDuration: "",
        strokeDasharray: "128",
        strokeDashoffset: "128",
    });

    applyStyle(rollingDots, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
    });

    applyStyle(accountFieldContainer, passwordFieldContainer, accountFieldBackground, passwordFieldBackground, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translateX(100px)",
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

    applyStyle(leftVerifyText, rightVerifyText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateY(-14px)`,
    });

    applyStyle(leftDiveText, rightDiveText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateY(-14px)`,
    });

    applyStyle(ipAndSystemTexts, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateY(-30px)`,
    })

    applyStyle(versionAndModeTexts, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateY(30px)`,
    });

    applyStyle(topLeftShortLines, bottomLeftShortLines, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateX(-22px)`,
    });

    applyStyle(topRightShortLines, bottomRightShortLines, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: `translateX(22px)`,
    });

    applyStyle(topLeftShortLine2, topLeftShortLine3, topRightShortLine2, topRightShortLine3, bottomLeftShortLine2, bottomLeftShortLine3, bottomRightShortLine2, bottomRightShortLine3, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0.5"
    });

    applyStyle(analyzeView, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "scaleX(0.6)",
        transformOrigin: "center",
    });

    applyStyle(leftBigCurve, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translate(-30px)",
    });

    applyStyle(rightBigCurve, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "translate(30px)",
    });

    applyStyle(accessText, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "scale(0.4)",
        transformOrigin: "center",
    });

    applyStyle(leftDiveStatus, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "perspective(50px) rotateY(1deg) translateX(-10px)",
        transformOrigin: "center",
    });

    applyStyle(rightDiveStatus, {
        transitionProperty: "",
        transitionDuration: "",
        opacity: "0",
        transform: "perspective(50px) rotateY(-1deg) translateX(10px)",
        transformOrigin: "center",
    });

    applyStyle(layoutContainer, {
        transitionProperty: "",
        transitionDuration: "",
        display: "",
        transformOrigin: "center",
    });

    const layoutContainerWidth = 1280;
    const layoutContainerHeight = 720;
    const initialWindowWidth = window.innerWidth;
    const initialWindowHeight = window.innerHeight;

    const handleWindowResize = () => {
        if (!elements.layoutContainer) {
            return window.removeEventListener("resize", handleWindowResize);
        }

        const windowWidth = Math.max(initialWindowWidth, window.innerWidth);
        const windowHeight = Math.max(initialWindowHeight, window.innerHeight);
        const widthRatio = windowWidth / layoutContainerWidth;
        const heightRatio = windowHeight / layoutContainerHeight;

        const scale =
            initialWindowWidth > initialWindowHeight
                ? Math.min(widthRatio, heightRatio)
                : Math.max(widthRatio, heightRatio);

        layoutContainer.style.transform = `scale(${scale})`;
    };

    window.addEventListener("resize", handleWindowResize);
    window.dispatchEvent(new Event("resize"));
}

export default initialize;
