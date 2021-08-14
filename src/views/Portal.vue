<template>
  <div class="portal">
    <header>{{ $t("portal.header.title") }}</header>
    <main>
      <form @submit.prevent>
        <div class="choose-version-hint">{{ $t("portal.main.chooseUi") }}</div>
        <div class="choose-version">
          <input
            type="radio"
            name="version"
            id="version-2.4"
            value="2.4"
            v-model="version"
          />

          <label class="version" for="version-2.4">
            <img src="/img/portal-images/ui-2.4.jpg" />
            <div class="version-text">Ver 2.4</div>
          </label>

          <input
            type="radio"
            name="version"
            id="version-3.0"
            value="3.0"
            v-model="version"
            checked
          />

          <label class="version" for="version-3.0">
            <img src="/img/portal-images/ui-3.0.jpg" />
            <div class="version-text">Ver 3.0</div>
          </label>
        </div>
        <div class="choose-language-hint">
          {{ $t("portal.main.chooseLang") }}
        </div>
        <div class="choose-language">
          <input
            type="radio"
            name="language"
            id="language-zh-TW"
            value="zh-TW"
            v-model="language"
            v-on:change="setLang('zh-TW')"
          />
          <label class="language" for="language-zh-TW">中</label>
          <input
            type="radio"
            name="language"
            id="language-en"
            value="en"
            v-model="language"
            v-on:change="setLang('en')"
          />
          <label class="language" for="language-en">EN</label>
          <input
            type="radio"
            name="language"
            id="language-jp"
            value="jp"
            v-model="language"
            v-on:change="setLang('jp')"
          />
          <label class="language" for="language-jp">JP</label>
          <input
            type="radio"
            name="language"
            id="language-ko"
            value="ko"
            v-model="language"
            v-on:change="setLang('ko')"
          />
          <label class="language" for="language-ko">KR</label>
        </div>
        <div style="text-align: center">
          <input
            type="submit"
            :value="$t('portal.main.forgotPassword')"
            @click="toForgotPassword"
            style="width: 120px"
          />
          <input
            type="submit"
            :value="$t('portal.main.register')"
            @click="toRegister"
          />
          <input
            type="submit"
            :value="$t('portal.main.fullScreen')"
            @click="openFullScreen"
            style="width: 120px"
          />
          <input
            type="submit"
            :value="$t('portal.main.submit')"
            @click="toLogin"
          />
        </div>
      </form>
    </main>
    <section id="donation">
      <a class="section-close" href="#"></a>
      <h1 style="text-align: center">{{ $t("portal.donation.title") }}</h1>
      <div style="max-width: 800px; margin: 10px auto; text-align: justify">
        <p>{{ $t("portal.donation.text1") }}</p>
        <p>{{ $t("portal.donation.text2") }}</p>
        <p>{{ $t("portal.donation.text3") }}</p>
      </div>
      <div class="choose-donation-method">
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="POST"
          target="_blank"
          style="display: none"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="84BK9N65GKEQQ" />
          <input type="submit" value="PayPal" id="go-to-paypal" />
        </form>
        <label class="donation-method" for="go-to-paypal">Paypal</label>
        <a
          class="donation-method"
          href="https://p.ecpay.com.tw/AA969D4"
          target="_blank"
          >ECPay</a
        >
      </div>
      <div style="color: #fbfbfb; text-align: center">
        0342 1788 7449 3263 2514 0108 7245 0730
      </div>
    </section>
    <section id="stat-of-2nd-creation">
      <a class="section-close" href="#"></a>
      <h1 style="text-align: center">{{ $t("portal.creation.title") }}</h1>
      <div style="max-width: 800px; margin: 10px auto">
        <p>{{ $t("portal.creation.text1") }}</p>
        <span
          style="display: flex; align-items: center; justify-content: center"
        >
          <a
            rel="license"
            href="https://creativecommons.org/licenses/by-nc-sa/3.0/tw/"
            target="_blank"
            style="display: block; margin-right: 10px"
          >
            <img
              src="https://i.creativecommons.org/l/by-nc-sa/3.0/tw/88x31.png"
              style="display: block"
            />
          </a>
          {{ $t("portal.creation.text2") }}
        </span>
        <p>
          {{ $t("portal.creation.text3") }}
          <a href="https://www.rayark.com/" target="_blank">www.rayark.com</a>
        </p>
      </div>
    </section>
    <section id="about-us">
      <a class="section-close" href="#"></a>
      <h1 style="text-align: center">{{ $t("portal.aboutUs.title") }}</h1>
      <div style="max-width: 800px; margin: 10px auto">
        <p>{{ $t("portal.aboutUs.text") }}</p>
        <p>
          Github：
          <a href="https://github.com/im-system-group" target="_blank"
            >https://github.com/im-system-group</a
          >
        </p>
        Email：admin@imsystem.site
        <hr />

        <p>{{ $t("portal.aboutUs.convener") }}：紅茶</p>
        <div class="media-button-div">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 200px;
              height: 200px;
            "
          >
            <img src="/img/portal-images/im-group/01.png" width="200" />
          </div>
          <div class="media-button-container">
            <a
              class="media-button"
              href="https://twitter.com/a5768549"
              target="_blank"
            >
              <i class="fab fa-twitter fa-2x"></i>a5768549
            </a>
            <a
              class="media-button"
              href="https://www.facebook.com/a5768549"
              target="_blank"
            >
              <i class="fab fa-facebook fa-2x"></i>a5768549
            </a>
            <a
              class="media-button"
              href="https://github.com/a5768549"
              target="_blank"
            >
              <i class="fab fa-github fa-2x"></i>a5768549
            </a>
            <div class="media-button-fill"></div>
          </div>
        </div>
        <p>Email：a57685492011@gmail.com</p>

        <hr />

        <p>{{ $t("portal.aboutUs.frontEnd") }}：fixiabis</p>
        <div class="media-button-div">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 200px;
              height: 200px;
            "
          >
            <img src="/img/portal-images/im-group/02.jpg" width="200" />
          </div>
          <div class="media-button-container">
            <a
              class="media-button"
              href="https://twitter.com/fixiabis"
              target="_blank"
            >
              <i class="fab fa-twitter fa-2x"></i>fixiabis
            </a>
            <a
              class="media-button"
              href="https://www.facebook.com/Fixiabis"
              target="_blank"
            >
              <i class="fab fa-facebook fa-2x"></i>fixiabis
            </a>
            <a
              class="media-button"
              href="https://github.com/fixiabis"
              target="_blank"
            >
              <i class="fab fa-github fa-2x"></i>fixiabis
            </a>
            <a
              class="media-button"
              href="https://www.linkedin.com/in/fixiabis/"
              target="_blank"
            >
              <i class="fab fa-linkedin fa-2x"></i>fixiabis
            </a>
            <div class="media-button-fill"></div>
            <div class="media-button-fill"></div>
          </div>
        </div>
        <p>Email：fixiabis@gmail.com</p>

        <hr />

        <p>{{ $t("portal.aboutUs.frontEnd") }}：SnowFireWolf</p>
        <div class="media-button-div">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 200px;
              height: 200px;
            "
          >
            <img src="/img/portal-images/im-group/03.jpg" width="200" />
          </div>
          <div class="media-button-container">
            <a
              class="media-button"
              href="https://twitter.com/SnowFireWolf"
              target="_blank"
            >
              <i class="fab fa-twitter fa-2x"></i>SnowFireWolf
            </a>
            <a
              class="media-button"
              href="https://www.facebook.com/SnowFireWolf"
              target="_blank"
            >
              <i class="fab fa-facebook fa-2x"></i>SnowFireWolf
            </a>
            <a
              class="media-button"
              href="https://github.com/SnowFireWolf"
              target="_blank"
            >
              <i class="fab fa-github fa-2x"></i>SnowFireWolf
            </a>
            <div class="media-button-fill"></div>
            <div class="media-button-fill"></div>
          </div>
        </div>
        <p>Email：snowcupwolf@gmail.com</p>

        <hr />

        <p>{{ $t("portal.aboutUs.backEnd") }}：a831123c</p>
        <div class="media-button-div">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 200px;
              height: 200px;
            "
          >
            <img src="/img/portal-images/im-group/04.jpg" width="200" />
          </div>
          <div class="media-button-container">
            <a
              class="media-button"
              href="https://www.facebook.com/profile.php?id=100001878496480"
              target="_blank"
            >
              <i class="fab fa-facebook fa-2x"></i>許家瑋
            </a>
            <a
              class="media-button"
              href="https://github.com/a831123c"
              target="_blank"
            >
              <i class="fab fa-github fa-2x"></i>a831123c
            </a>
            <div class="media-button-fill"></div>
            <div class="media-button-fill"></div>
          </div>
        </div>
        <p>Email：a831123d@gmail.com</p>

        <hr />

        <p>{{ $t("portal.aboutUs.japaneseTranslator") }}：ナナナ</p>
        <div class="media-button-div">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 200px;
              height: 200px;
            "
          >
            <img src="/img/portal-images/im-group/05.jpg" width="200" />
          </div>
          <div class="media-button-container">
            <a
              class="media-button"
              href="https://twitter.com/Nanananananauw"
              target="_blank"
            >
              <i class="fab fa-twitter fa-2x"></i>ナナナ Σ:3
            </a>
            <a
              class="media-button"
              href="https://www.facebook.com/2c10mai/"
              target="_blank"
            >
              <i class="fab fa-facebook fa-2x"></i>兩啖
            </a>
            <div class="media-button-fill"></div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <nav>
        <ul>
          <!-- <li>
            <a v-if="mobile" id="donation" href="#donation">{{
              $t("portal.footer.donation")
            }}</a>
          </li> -->
          <li>
            <a href="#stat-of-2nd-creation">{{
              $t("portal.footer.creation")
            }}</a>
          </li>
          <li>
            <a href="#about-us">{{ $t("portal.footer.aboutUs") }}</a>
          </li>
          <li style="color: #444">v{{ appVersion }}</li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import { /*mapState,*/ mapActions /* , mapMutations */ } from "vuex";

export default {

  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
      mobile: false,
      version: "3.0",
      language: localStorage.getItem("footmark-lang") || "zh-TW",
    }
  },

  methods: {
    ...mapActions("profile", ["loadItem"]),
    toLogin() {
      this.$router.push(`/login?version=${this.version}`);
    },
    toRegister() {
      this.$router.push("/register");
    },
    toForgotPassword() {
      this.$router.push("/forgot-password");
    },
    openFullScreen() {
      const view = document.body;

      if (view.requestFullscreen) {
        view.requestFullscreen();
      } else if (view.msRequestFullscreen) {
        view.msRequestFullscreen();
      } else if (view.mozRequestFullScreen) {
        view.mozRequestFullScreen();
      } else if (view.webkitRequestFullscreen) {
        view.webkitRequestFullscreen();
      }
    },

    async initPage() {
      try {
        document.createEvent("TouchEvent");
        this.mobile = false;
      } catch (e) {
        this.mobile = true;
      }

      if (window.innerWidth < window.innerHeight) {
        var element = document.createElement("div");
        element.className = "rotate-hint";
        document.body.append(element);
        element.onclick = () => element.remove();
        setTimeout(element.onclick, 3 * 1000);
      }

      try {
        const response = await this.loadItem();

        if (response) {
          //alert(this.$t("已登入"));
          this.$router.push("/articles");
        } else {
          //alert('未登入')
        }
      } catch (err) {
        console.log("error");
        //alert(this.$t("profile.update.fail"));
      }
    },
  
    initLanguage() {
      let browserLang = navigator.language;
      let localStorageLang = localStorage.getItem("footmark-lang");

      // if local save lang is null
      if(!localStorageLang) {
        // user language check
        if (/^zh\b/.test(browserLang)) {
          // 中文
          this.setLang('zh-TW')
        } else if (/^ja\b/.test(browserLang)){
          // 日本語
          this.setLang('jp')
        } else if (/^ko\b/.test(browserLang)){
          // 韓語
          this.setLang('ko')
        } else {
          // English
          this.setLang('en')
        }
      } else {
        this.setLang(localStorageLang)
      }

    },

    setLang(value) {
      this.$i18n.locale = value;
      localStorage.setItem("footmark-lang", value);
    },
  },

  mounted() {
    this.initLanguage()
    this.initPage()
  },
};
</script>

<style>
body > .rotate-hint {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  animation: show-rotate-hint 0.5s;
}

body > .rotate-hint::after {
  /*TODO:中文處理*/
  content: "建議螢幕採用橫向";
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 100px);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

@keyframes show-rotate-hint {
  from {
    opacity: 0;
  }
}
</style>

<style scoped>
.portal {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  max-width: -webkit-fill-available;
  max-height: -webkit-fill-available;
  font-family: "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "Roboto";
  background-color: #fff;
}

header {
  font-size: 40px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
}

main {
  width: 100%;
  height: calc(100% - 120px);
  padding: 10px;
  border-top: 1px solid #010001;
  border-bottom: 1px solid #010001;
  overflow: auto;
}

section {
  position: fixed;
  border-top: 1px solid #010001;
  border-bottom: 1px solid #010001;
  width: 100%;
  height: calc(100% - 120px);
  top: 60px;
  left: 0;
  background-color: #fefefe;
  padding: 10px;
  transition: all 0.5s;
  overflow: auto;
  opacity: 0;
  transform: translateX(-100%);
}

section:target {
  opacity: 1;
  transform: translateX(0%);
}

section:target ~ section {
  opacity: 0;
  transform: translateX(100%);
}

.section-close {
  display: block;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #010001;
  background-image: url('data:image/svg+xml,<svg%20width%3D"40"%20height%3D"40"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"><path%20d%3D"M%2010%2010%20l%2020%2020%20M%2010%2030%20l%2020%20-20"%20stroke%3D"%23fefefe"%20stroke-width%3D"1"%20fill%3D"none"><\%2Fpath><\%2Fsvg>');
  transition: all 0.5s;
}

.section-close:active {
  transform: scale(0.6);
}

.choose-version-hint,
.choose-language-hint {
  width: 100%;
  max-width: 360px;
  margin: 10px auto;
}

.choose-version {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}

.choose-language input[type="radio"],
.choose-version input[type="radio"] {
  display: none;
}

.version {
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  font-size: 26px;
  color: #fefefe;
  cursor: pointer;
  user-select: none;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  width: 150px;
  height: 100px;
  margin: 10px;
  opacity: 0.75;
  transition: all 0.25s;
}

.version:active {
  transform: scale(0.6);
}

input[type="radio"]:checked + .version {
  color: gold;
  opacity: 1;
}

.version * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choose-language {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

.language {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  color: #fefefe;
  margin: 10px;
  background-color: #010001;
  opacity: 0.75;
  transition: all 0.5s;
}

.language:active {
  transform: scale(0.6);
}

input[type="radio"]:checked + .language {
  color: gold;
  opacity: 1;
}

.choose-donation-method {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}

.donation-method {
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  font-size: 26px;
  color: #fefefe;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #010001;
  position: relative;
  top: 0;
  left: 0;
  width: 150px;
  height: 100px;
  margin: 10px;
  opacity: 0.75;
  transition: all 0.25s;
}

.donation-method:active {
  transform: scale(0.6);
}

.donation-method * {
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  position: absolute;
  font-size: 26px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer {
  width: 100%;
  height: 60px;
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  margin: 0;
  height: 60px;
}

nav ul li {
  display: block;
  width: 140px;
  height: 60px;
  list-style: none;
  margin: 0px 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav ul li a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
}

a {
  color: #666;
  text-decoration: none;
}

input[type="submit"] {
  outline: none;
  cursor: pointer;
  display: inline-block;
  margin: 20px 10px;
  width: 100px;
  height: 40px;
  background-color: #010001;
  border: none;
  color: #fefefe;
  transition: all 0.5s;
}

input[type="submit"]:active {
  transform: scale(0.6);
}

.media-button-div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 800px;
  width: 100%;
}

.media-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 200px);
  min-height: 200px;
  flex-wrap: wrap;
  align-content: center;
}

.media-button {
  width: 150px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 2px;
  line-height: 50px;
  font-family: "Electrolize", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR",
    "Roboto";
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  border: none;
  outline: none;
  color: #000;
}

.media-button:active {
  color: #130f13;
  background-color: #bbb;
  transform: scale(0.8);
}

.media-button i {
  margin-right: 5px;
}

.media-button-fill {
  width: 150px;
  margin: 0 10px;
}

@media screen and (max-width: 360px) {
  .version,
  .donation-method {
    width: 120px;
    height: 80px;
  }

  .language {
    width: 50px;
    height: 50px;
  }
}

@media screen and (max-width: 300px) {
  .version,
  .donation-method {
    width: 105px;
    height: 70px;
  }

  .language {
    width: 40px;
    height: 40px;
  }
}

@media screen and (min-width: 700px) {
  .choose-version-hint,
  .choose-language-hint {
    max-width: 640px;
  }

  .choose-version,
  .choose-donation-method {
    max-width: 640px;
  }

  .choose-language {
    max-width: 400px;
  }

  .version,
  .donation-method {
    width: 300px;
    height: 200px;
  }

  .language {
    width: 80px;
    height: 80px;
  }
}

a[href="#donation"] {
  color: red;
  font-weight: bold;
  animation: shake-it 0.25s infinite linear;
}

@keyframes shake-it {
  0% {
    transform: translate(5px, 5px);
  }

  25% {
    transform: translate(-5px, -5px);
  }

  50% {
    transform: translate(-5px, 5px);
  }

  75% {
    transform: translate(5px, -5px);
  }
}
</style>