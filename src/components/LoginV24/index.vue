<template>
  <main>
    <div class="layout-container" style="display: block;">
      <div class="initialize-layout">
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
          <path
            d="M 16 0 v 720 M 49.35 0 v 720 M 82.7 0 v 720 M 116.05 0 v 720 M 149.4 0 v 720 M 182.75 0 v 720 M 216.1 0 v 720 M 249.45 0 v 720 M 282.8 0 v 720 M 316.15 0 v 720 M 349.5 0 v 720 M 382.85 0 v 720 M 416.2 0 v 720 M 449.55 0 v 720 M 482.9 0 v 720 M 516.25 0 v 720 M 549.6 0 v 720 M 582.95 0 v 720 M 616.3 0 v 720 M 649.65 0 v 720 M 683 0 v 720 M 716.35 0 v 720 M 749.7 0 v 720 M 783.05 0 v 720 M 816.4 0 v 720 M 849.75 0 v 720 M 883.1 0 v 720 M 916.45 0 v 720 M 949.8 0 v 720 M 983.15 0 v 720 M 1016.5 0 v 720 M 1049.85 0 v 720 M 1083.2 0 v 720 M 1116.55 0 v 720 M 1149.9 0 v 720 M 1183.25 0 v 720 M 1216.6 0 v 720 M 1249.95 0 v 720 M 0 16 h 1280 M 0 49.35 h 1280 M 0 82.7 h 1280 M 0 116.05 h 1280 M 0 149.4 h 1280 M 0 182.75 h 1280 M 0 216.1 h 1280 M 0 249.45 h 1280 M 0 282.8 h 1280 M 0 316.15 h 1280 M 0 349.5 h 1280 M 0 382.85 h 1280 M 0 416.2 h 1280 M 0 449.55 h 1280 M 0 482.9 h 1280 M 0 516.25 h 1280 M 0 549.6 h 1280 M 0 582.95 h 1280 M 0 616.3 h 1280 M 0 649.65 h 1280 M 0 683 h 1280 M 0 716.35 h 1280"
            stroke="#444"
            stroke-width="0.25"
            fill="none"
          />

          <path
            class="curves"
            d="M 468 283 a 168 168 0 0 0 0 168 M 798 283 a 168 168 0 0 1 0 168"
            fill="none"
            stroke="#ddd"
            stroke-width="0.25"
          />

          <path
            class="bottom-left-line"
            d="M 382.85 477 h 140 m -20 0 m 0 -1 a 1 1 0 0 1, 0 2 a 1 1 0 0 1, 0 -2 m -20 1 m 0 -2 a 2 2 0 0 1, 0 4 a 2 2 0 0 1, 0 -4 m -10 2 m 0 -1 a 1 1 0 0 1, 0 2 a 1 1 0 0 1, 0 -2"
            fill="#ddd"
            stroke="#ddd"
            stroke-width="0.25"
          />

          <path
            class="bottom-right-line"
            d="M 744 477 h 140 m -140 0 m 20 0 m 0 -1 a 1 1 0 0 1, 0 2 a 1 1 0 0 1, 0 -2 m 20 1 m 0 -2 a 2 2 0 0 1, 0 4 a 2 2 0 0 1, 0 -4 m 10 2 m 0 -1 a 1 1 0 0 1, 0 2 a 1 1 0 0 1, 0 -2"
            fill="#ddd"
            stroke="#ddd"
            stroke-width="0.25"
          />

          <g fill="none" stroke="#ddd" stroke-width="0.25">
            <path class="bottom-upper-line" d="M 582.55 496 h 100.05" />
            <path class="bottom-lower-line" d="M 482.5 498 h 300.15" />
          </g>

          <path
            class="vertical-rolling-dots"
            d="M 549.6 445 v -145 M 716.35 445 v -145"
            stroke="#b3b1b3"
            stroke-width="3.5"
            stroke-dasharray="0 32.5"
            stroke-linecap="round"
          />

          <rect
            class="system-access-to-im-system-text-background"
            x="576"
            y="449"
            width="113"
            height="13"
            fill="rgba(255, 255, 255, 0.1)"
          />

          <text class="system-access-to-im-system-text" x="586" y="458.5" fill="#ddd">
            Access To iM
            System
          </text>

          <path
            class="system-middle-line"
            d="M 555 467 h 155"
            fill="none"
            stroke="#ddd"
            stroke-width="0.5"
          />

          <text class="system-version-straght-link-mode-text" x="560" y="479" fill="#bbb">
            Version 2.4
            Straght
            Link
            Mode
          </text>

          <g class="progress-circles">
            <circle
              class="outer-progress-circle"
              cx="633"
              cy="364"
              r="66"
              stroke="#ddd"
              stroke-width="0.5"
              fill="rgba(255, 255, 255, 0.1)"
            />
            <circle
              class="inner-progress-circle"
              cx="633"
              cy="364"
              r="44"
              stroke="#ddd"
              stroke-width="0.5"
              fill="none"
            />
          </g>

          <text class="left-bracket-text" x="526" y="272" fill="#bbb">[</text>
          <text class="right-bracket-text" x="725" y="272" fill="#bbb">]</text>

          <text class="initializing-text" x="560" y="274" fill="#bbb">INITIALIZING</text>
          <text class="finished-text" x="575" y="274" fill="#bbb">FINISHED</text>
        </svg>
      </div>
      <div class="login-layout">
        <div class="login-form">
          <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
            <path
              d="M 16 0 v 720 M 49.35 0 v 720 M 82.7 0 v 720 M 116.05 0 v 720 M 149.4 0 v 720 M 182.75 0 v 720 M 216.1 0 v 720 M 249.45 0 v 720 M 282.8 0 v 720 M 316.15 0 v 720 M 349.5 0 v 720 M 382.85 0 v 720 M 416.2 0 v 720 M 449.55 0 v 720 M 482.9 0 v 720 M 516.25 0 v 720 M 549.6 0 v 720 M 582.95 0 v 720 M 616.3 0 v 720 M 649.65 0 v 720 M 683 0 v 720 M 716.35 0 v 720 M 749.7 0 v 720 M 783.05 0 v 720 M 816.4 0 v 720 M 849.75 0 v 720 M 883.1 0 v 720 M 916.45 0 v 720 M 949.8 0 v 720 M 983.15 0 v 720 M 1016.5 0 v 720 M 1049.85 0 v 720 M 1083.2 0 v 720 M 1116.55 0 v 720 M 1149.9 0 v 720 M 1183.25 0 v 720 M 1216.6 0 v 720 M 1249.95 0 v 720 M 0 16 h 1280 M 0 49.35 h 1280 M 0 82.7 h 1280 M 0 116.05 h 1280 M 0 149.4 h 1280 M 0 182.75 h 1280 M 0 216.1 h 1280 M 0 249.45 h 1280 M 0 282.8 h 1280 M 0 316.15 h 1280 M 0 349.5 h 1280 M 0 382.85 h 1280 M 0 416.2 h 1280 M 0 449.55 h 1280 M 0 482.9 h 1280 M 0 516.25 h 1280 M 0 549.6 h 1280 M 0 582.95 h 1280 M 0 616.3 h 1280 M 0 649.65 h 1280 M 0 683 h 1280 M 0 716.35 h 1280"
              stroke="#444"
              stroke-width="0.25"
              fill="none"
            />

            <rect
              class="login-form-top-cover"
              x="339"
              y="238"
              fill="#121012"
              width="610"
              height="8"
            />

            <rect
              class="login-form-left-cover"
              x="316"
              y="240"
              fill="#121012"
              width="56"
              height="245"
            />

            <rect
              class="login-form-right-cover"
              x="943"
              y="240"
              fill="#121012"
              width="36"
              height="245"
            />

            <path
              class="login-form-top-line"
              d="M 362 248 h 3 m 8 0 h 570 m 8 0 h 3"
              stroke="#ddd"
              stroke-width="3"
            />

            <path
              class="login-form-bottom-line"
              d="M 362 476 h 3 m 8 0 h 570 m 8 0 h 3"
              stroke="#ddd"
              stroke-width="3"
            />

            <path
              class="login-form-horizon-rolling-dots"
              d="M 408 285 h 485"
              stroke="#b3b1b3"
              stroke-width="3.5"
              stroke-dasharray="0 30"
              stroke-linecap="round"
            />

            <g class="login-form-account-field-background">
              <rect
                x="399"
                y="309"
                width="513"
                height="45"
                fill="rgba(255, 255, 255, 0.1)"
                rx="3"
                ry="3"
              />

              <text
                x="420"
                y="340"
                fill="#bbb"
                font-family="Rubik"
                font-size="26px"
                style="letter-spacing: 0.9px;"
              >ACCOUNT</text>

              <text
                x="534"
                y="328"
                font-family="Ubuntu Mono"
                font-size="30px"
                font-weight="bold"
                fill="#bbb"
              >+</text>

              <path d="M 566 321 v 21" stroke="#bbb" stroke-width="2" />
            </g>

            <g class="login-form-password-field-background">
              <rect
                x="399"
                y="363"
                width="513"
                height="45"
                fill="rgba(255, 255, 255, 0.1)"
                rx="3"
                ry="3"
              />

              <text
                x="420"
                y="397"
                fill="#bbb"
                font-family="Rubik"
                font-size="24px"
                style="letter-spacing: -0.3px;"
              >PASSWORD</text>

              <text
                x="535"
                y="383"
                font-family="Ubuntu Mono"
                font-size="30px"
                font-weight="bold"
                fill="#bbb"
              >+</text>

              <path d="M 566 375 v 21" stroke="#bbb" stroke-width="2" />
            </g>

            <rect
              class="system-access-to-im-system-text-background"
              x="425"
              y="428"
              width="113"
              height="13"
              fill="rgba(255, 255, 255, 0.1)"
            />

            <text class="system-access-to-im-system-text" x="434" y="438" fill="#bbb">
              Access To iM
              System
            </text>

            <path
              class="system-middle-line"
              d="M 405 447 h 150"
              fill="none"
              stroke="#ddd"
              stroke-width="0.5"
            />

            <text class="system-version-straght-link-mode-text" x="410" y="458" fill="#ddd">
              Version 2.4
              Straght
              Link
              Mode
            </text>
          </svg>
        </div>
        <div class="account-field-container">
          <input
            type="text"
            class="account-field-asterisk"
            tabindex="-1"
            spellcheck="false"
            autocomplete="off"
          />
          <input
            type="text"
            class="account-field"
            name="account"
            tabindex="0"
            spellcheck="false"
            autocomplete="off"
          />
        </div>
        <div class="password-field-container">
          <input
            type="text"
            class="password-field-asterisk"
            tabindex="-1"
            spellcheck="false"
            autocomplete="off"
          />
          <input
            type="text"
            class="password-field"
            name="password"
            tabindex="0"
            spellcheck="false"
            autocomplete="off"
          />
        </div>
        <input type="button" class="login-button" value="LOGIN" />
      </div>
      <div class="verify-layout">
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
          <path
            d="M 482.9 140 v 444 M 516.25 140 v 444 M 549.6 140 v 444 M 582.95 140 v 444 M 616.3 140 v 444 M 649.65 140 v 444 M 683 140 v 444 M 716.35 140 v 444 M 749.7 140 v 444 M 783.05 140 v 444 M 816.4 140 v 444 M 474 149.4 h 366 M 474 182.75 h 366 M 474 216.1 h 366 M 474 249.45 h 366 M 474 282.8 h 366 M 474 316.15 h 366 M 474 349.5 h 366 M 474 382.85 h 366 M 474 416.2 h 366 M 474 449.55 h 366 M 474 482.9 h 366 M 474 516.25 h 366 M 474 549.6 h 366"
            stroke="#444"
            stroke-width="0.25"
            fill="none"
          />

          <rect x="474" y="139" width="366" height="445" fill="rgba(255, 255, 255, 0.05)" />

          <path
            class="verify-view-top-line"
            d="M 446 137 h 3 m 6 0 h 405 m 6 0 h 3"
            stroke="#ddd"
            stroke-width="3"
          />

          <path
            class="verify-view-top-line"
            d="M 446 586 h 3 m 6 0 h 405 m 6 0 h 3"
            stroke="#ddd"
            stroke-width="3"
          />

          <rect
            class="verifying-text-background"
            x="560"
            y="159"
            width="192"
            height="44"
            fill="rgba(255, 255, 255, 0.1)"
          />

          <text
            class="verifying-text"
            x="596"
            y="189"
            fill="#bbb"
            font-family="Rubik"
            font-size="22px"
            style="letter-spacing: 1.2px;"
          >VERIFYING</text>

          <path
            class="verify-view-horizon-rolling-dots"
            d="M 488 232 h 335"
            stroke="#b3b1b3"
            stroke-width="3.5"
            stroke-dasharray="0 30"
            stroke-linecap="round"
          />
        </svg>
        <img class="avatar" :src="item?.avatarUrl"/>
      </div>
      <div class="shared-layout">
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
          <g stroke="#121012" fill="none">
            <circle class="outer-circle-cover" cx="640" cy="360" r="640" stroke-width="480" />
            <circle class="inner-circle-cover" cx="640" cy="360" r="79.95" stroke-width="360" />
          </g>
        </svg>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "login-v24",

  computed: {
    ...mapState("profile", ["item"])
  },

  async mounted() {
    const main = require("./scripts/main").default;

    await main(
      form =>
        new Promise((resolve, reject) => {
          this.$emit("login", { form, resolve, reject });
        })
    );

    this.$emit("logged");
  }
};
</script>

<style scoped src="./styles/main.css"></style>
<style scoped src="./styles/initialize.css"></style>
<style scoped src="./styles/login.css"></style>
<style scoped src="./styles/verify.css"></style>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Electrolize&family=Passion+One&family=Noto+Sans+TC&family=Rubik:wght@300&family=Ubuntu+Mono:wght@700&family=Roboto+Mono&family=Mukta&display=swap";
</style>
