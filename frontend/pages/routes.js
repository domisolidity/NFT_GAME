// import
import Home from "./home";
// import Mypage from "./mypage/index";
import { HomeIcon, StatsIcon, CartIcon, RocketIcon, WalletIcon } from "../components/Icons/Icons";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/Home",
    subName: false,
  },
  {
    path: "/rank",
    name: "Rank",
    icon: <StatsIcon color="inherit" />,
    component: Home,
    layout: "/SideBarScreen",
  },
  {
    path: "/game",
    name: "Game",
    icon: <RocketIcon color="inherit" />,
    component: Home,
    layout: "/SideBarScreen",
    subName: false,
  },
  {
    path: "/market",
    name: "Market",
    icon: <CartIcon color="inherit" />,
    component: Home,
    layout: "/SideBarScreen",
    subName: false,
  },
  {
    path: "/nft",
    name: "NFT",
    icon: <WalletIcon color="inherit" />,
    component: Home,
    layout: "/SideBarScreen",
    subName: false,
  },
];
export default dashRoutes;
