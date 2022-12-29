import "@fireworks-js/web";

const syncFireworks = (mq) => {
  if (mq.matches) {
    document
      .querySelectorAll(".fireworks")
      .forEach((node) => node.fireworks.stop());
  } else {
    document
      .querySelectorAll(".fireworks")
      .forEach((node) => node.fireworks.start());
  }
};

const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

syncFireworks(mq);
mq.addEventListener("change", () => syncFireworks(mq));
