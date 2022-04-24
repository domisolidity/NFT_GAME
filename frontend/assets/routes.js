import {
  HomeIcon,
  StatsIcon,
  CartIcon,
  RocketIcon,
  SupportIcon,
  DocumentIcon
} from "../components/Icons/Icons";

const routes = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
  },
  {
    path: "/rank",
    name: "Rank",
    icon: <StatsIcon color="inherit" />,
  },
  {
    path: "/game",
    name: "Game",
    icon: <RocketIcon color="inherit" />,
  },
  {
    path: "/market",
    name: "Market",
    icon: <CartIcon color="inherit" />,
  },
  {
    path: "/nft",
    name: "NFT",
    icon: <DocumentIcon color="inherit" />,
  },
  {
    path: "/admin",
    name: "Admin",
    icon: <SupportIcon color="inherit" />,
  },
];
export default routes;
