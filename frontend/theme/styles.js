import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: "Helvetica, sans-serif",
      },
      html: {
        fontFamily: "Helvetica, sans-serif",
      },
      "&::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "30px",
        backgroundColor: "var(--chakra-colors-whiteAlpha-200)",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-corner": {
        background: "transparent",
      },
    }),
  },
};
