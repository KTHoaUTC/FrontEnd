declare global {
  export namespace AdminCore {
    export interface AuthContext {
      login: boolean;

      setLogin: (value: boolean) => void;

      user?: User;

      setUser: (value?: User) => void;
    }
  }
}

export {};
