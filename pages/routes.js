// import
import Home from "./home";
import Mypage from "./mypage";
import {
  HomeIcon,
  StatsIcon,
  CartIcon,
  PersonIcon,
  RocketIcon,
  WalletIcon
} from "../components/Icons/Icons";

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
    subName: [
      {
        path: "/rank",
        name: "블록쌓기",
        icon: <StatsIcon color="inherit" />,
        secondaryNavbar: true,
        component: Mypage,
        layout: "/Home",
      },
      {
        path: "/rank",
        name: "테트리스",
        icon: <StatsIcon color="inherit" />,
        secondaryNavbar: true,
        component: Mypage,
        layout: "/Home",
      },
      {
        path: "/rank",
        name: "보물찾기",
        icon: <StatsIcon color="inherit" />,
        secondaryNavbar: true,
        component: Mypage,
        layout: "/Home",
      },
    ],
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

  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/mypage",
        name: "My Page",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Mypage,
        layout: "/Home",
      },
    ],
  },
];
export default dashRoutes;
