import { applyStyle, delay } from "../utils";
import elements from "../elements";

/** 驗證動畫 */
async function verifyAnimation(whenVerified) {
    const {
        accountField,
        rollingDots,
        accountFieldContainer,
        passwordFieldContainer,
        accountFieldBackground,
        passwordFieldBackground,
        leftLoginText,
        rightLoginText,
        analyzeView,
        leftBigCurve,
        rightBigCurve,
        leftVerifyText,
        rightVerifyText,
        ipAndSystemTexts,
        versionAndModeTexts,
        topLeftShortLines,
        bottomLeftShortLines,
        topRightShortLines,
        bottomRightShortLines,
        topLeftShortLine1,
        topRightShortLine1,
        bottomLeftShortLine1,
        bottomRightShortLine1,
        topLeftShortLine2,
        topRightShortLine2,
        bottomLeftShortLine2,
        bottomRightShortLine2,
        topLeftShortLine3,
        topRightShortLine3,
        bottomLeftShortLine3,
        bottomRightShortLine3,
    } = elements;

    await delay(250);

    applyStyle(accountFieldContainer, passwordFieldContainer, accountFieldBackground, passwordFieldBackground, {
        opacity: "0",
        transform: "scale(0.8)",
    });

    applyStyle(leftLoginText, {
        opacity: "0",
        transform: `translateX(50px)`,
    });

    applyStyle(rightLoginText, {
        opacity: "0",
        transform: `translateX(-50px)`,
    });

    applyStyle(analyzeView, {
        transitionProperty: "all",
        transitionDuration: "0.5s",
        opacity: "1",
        transform: "scaleX(1)",
    });

    applyStyle(leftBigCurve, rightBigCurve, {
        transitionProperty: "all",
        transitionDuration: "0.5s",
        opacity: "0.25",
        transform: "translate(0px)",
    });

    await delay(250);

    applyStyle(accountFieldContainer, passwordFieldContainer, {
        display: "none"
    });

    applyStyle(leftVerifyText, rightVerifyText, {
        transitionProperty: "opacity, transform",
        transitionDuration: "0.1s, 0.5s",
        opacity: "1",
        transform: `translateY(0px)`,
    });

    applyStyle(ipAndSystemTexts, versionAndModeTexts, {
        transitionProperty: "all",
        transitionDuration: "0.5s",
        opacity: "1",
        transform: `translateY(0px)`,
    });

    applyStyle(topLeftShortLines, bottomLeftShortLines, topRightShortLines, bottomRightShortLines, {
        transitionProperty: "all",
        transitionDuration: "0.5s",
        opacity: "1",
        transform: `translateX(0px)`,
    });

    let profile = null;
    let error = null;
    const whenRespondProfile = whenVerified || Promise.resolve(null);

    whenRespondProfile
        .then(respondedProfile => profile = respondedProfile)
        .catch(respondedError => error = respondedError);

    /** 短線群組，供顏色切換 */
    const shortLineGroupsForSwitch = [
        {
            from: [topLeftShortLine1, topRightShortLine1, bottomLeftShortLine1, bottomRightShortLine1],
            to: [topLeftShortLine2, topRightShortLine2, bottomLeftShortLine2, bottomRightShortLine2],
        },
        {
            from: [topLeftShortLine2, topRightShortLine2, bottomLeftShortLine2, bottomRightShortLine2],
            to: [topLeftShortLine3, topRightShortLine3, bottomLeftShortLine3, bottomRightShortLine3],
        },
        {
            from: [topLeftShortLine3, topRightShortLine3, bottomLeftShortLine3, bottomRightShortLine3],
            to: [topLeftShortLine2, topRightShortLine2, bottomLeftShortLine2, bottomRightShortLine2],
        },
        {
            from: [topLeftShortLine2, topRightShortLine2, bottomLeftShortLine2, bottomRightShortLine2],
            to: [topLeftShortLine1, topRightShortLine1, bottomLeftShortLine1, bottomRightShortLine1],
        },
    ];

    for (let i = 0; i < 2; i++) {
        for (let shortLineGroupForSwitch of shortLineGroupsForSwitch) {
            await delay(250);

            applyStyle(...shortLineGroupForSwitch.from, {
                opacity: "0.5",
            });

            applyStyle(...shortLineGroupForSwitch.to, {
                opacity: "1",
            });
        }
    }

    while (profile === null && error === null) {
        for (let shortLineGroupForSwitch of shortLineGroupsForSwitch) {
            await delay(250);

            applyStyle(...shortLineGroupForSwitch.from, {
                opacity: "0.5",
            });

            applyStyle(...shortLineGroupForSwitch.to, {
                opacity: "1",
            });
        }
    }

    if (error) {
        await delay(250);

        applyStyle(accountFieldContainer, passwordFieldContainer, {
            display: "",
        });

        applyStyle(leftVerifyText, rightVerifyText, {
            opacity: "0",
            transform: `translateY(-14px)`,
        });

        applyStyle(ipAndSystemTexts, {
            opacity: "0",
            transform: `translateY(-30px)`,
        })

        applyStyle(versionAndModeTexts, {
            opacity: "0",
            transform: `translateY(30px)`,
        });

        applyStyle(topLeftShortLines, bottomLeftShortLines, {
            opacity: "0",
            transform: `translateX(-22px)`,
        });

        applyStyle(topRightShortLines, bottomRightShortLines, {
            opacity: "0",
            transform: `translateX(22px)`,
        });

        await delay(250);

        applyStyle(leftLoginText, rightLoginText, {
            transitionProperty: "opacity, transform",
            transitionDuration: "0.1s, 0.5s",
            opacity: "1",
            transform: `translateY(0px)`,
        });

        applyStyle(accountFieldContainer, accountFieldBackground, {
            transitionProperty: "opacity, transform",
            transitionDuration: "1s, 0.5s",
            opacity: "1",
            transform: "translateX(0px)",
        });

        accountField.focus();

        applyStyle(rollingDots, {
            transitionProperty: "opacity",
            transitionDuration: "0.2s",
            opacity: "1",
        });

        await delay(250);

        applyStyle(passwordFieldContainer, passwordFieldBackground, {
            transitionProperty: "opacity, transform",
            transitionDuration: "1s, 0.5s",
            opacity: "1",
            transform: "translateX(0px)",
        });

        applyStyle(analyzeView, {
            opacity: "0",
            transform: "scaleX(0.6)",
            transformOrigin: "center",
        });

        applyStyle(leftBigCurve, {
            opacity: "0",
            transform: "translate(-30px)",
        });

        applyStyle(rightBigCurve, {
            opacity: "0",
            transform: "translate(30px)",
        });

        throw error;
    }
}

export default verifyAnimation;
