// import
import Home from "../pages/home";
// import Mypage from "./mypage/index";
import {
  HomeIcon,
  StatsIcon,
  CartIcon,
  PersonIcon,
  RocketIcon,
  WalletIcon
} from "./Icons/Icons";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    subName: false,
  },
  {
    path: "/rank",
    name: "Rank",
    icon: <StatsIcon color="inherit" />,
    component: Home,
  },
  {
    path: "/game",
    name: "Game",
    icon: <RocketIcon color="inherit" />,
    component: Home,
    subName: false,
  },
  {
    path: "/market",
    name: "Market",
    icon: <CartIcon color="inherit" />,
    component: Home,
    subName: false,
  },
  {
    path: "/nft",
    name: "NFT",
    icon: <WalletIcon color="inherit" />,
    component: Home,
    subName: false,
  },
  {
    path: "/admin",
    name: "Admin",
    icon: <WalletIcon color="inherit" />,
    component: Home,
    subName: false,
  },
];
export default dashRoutes;
