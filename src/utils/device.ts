export const getHasTouchScreen = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export const getIsMobile = () => {
  return window.innerWidth <= 768 && getHasTouchScreen();
};
