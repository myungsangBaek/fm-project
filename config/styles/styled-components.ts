import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      gray10: string;
      gray20: string;
      gray30: string;
      gray40: string;

      main: string;

      black: string;
      white: string;
    };
  }
}
