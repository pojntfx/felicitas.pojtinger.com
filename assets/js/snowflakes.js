import Snowflakes from "magic-snowflakes";

const sv = new Snowflakes({
  color: "#ffffff",
});

const syncSnowflakes = (mq) => {
  if (mq.matches) {
    sv.stop();
    sv.hide();
  } else {
    sv.show();
    sv.start();
  }
};

const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

syncSnowflakes(mq);
mq.addEventListener("change", () => syncSnowflakes(mq));
