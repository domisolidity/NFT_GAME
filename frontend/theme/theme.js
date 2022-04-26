import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { font } from "./foundations/fonts";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PanelContentComponent } from "./additions/layout/PanelContent";
import { PanelContainerComponent } from "./additions/layout/PanelContainer";
export default extendTheme(
  { breakpoints },
  globalStyles,
  font,
  buttonStyles,
  badgeStyles,
  linkStyles,
  drawerStyles,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  MainPanelComponent,
  PanelContentComponent,
  PanelContainerComponent
);
