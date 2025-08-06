let navigateFn: (path: string) => void;

export const setNavigateFn = (navigate: (path: string) => void) => {
  navigateFn = navigate;
};

export const handleNavigate = (path: string) => {
  if (navigateFn) {
    navigateFn(path);
  } else {
    console.warn("navigate no está inicializado");
  }
};
