let currentCallback = null;

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
};

export const 발행기관 = (obj) => {
  const state = {};

  for (const [key, value] of Object.entries(obj)) {
    let initState = value;
    let observer = new Set();

    Object.defineProperty(state, key, {
      get() {
        observer.add(currentCallback);
        return initState;
      },
      set(value) {
        initState = value;
        observer.forEach((x) => x());
      },
    });
  }

  return state;
};
