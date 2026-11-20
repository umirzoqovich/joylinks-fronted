const TOKEN_KEY = 'joylinks.admin.token';

/** Admin JWT tokenini brauzerda saqlash */
export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* private rejim — e'tiborsiz qoldiramiz */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* e'tiborsiz qoldiramiz */
    }
  },
};
