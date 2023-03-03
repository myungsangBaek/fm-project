import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      gray10: string;
      gray20: string;
      gray30: string;

      main: string;

      white: string;
    };
  }
}
