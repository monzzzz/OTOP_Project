import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faTools } from "@fortawesome/free-solid-svg-icons";

export const Nav_data = [
  { id: "home", text: "Home", href: "/", icon: faHouseChimney },
  {
    id: "marketplace",
    text: "Marketplace",
    href: "/marketplace",
    icon: faStore,
  },
  { id: "about_us", text: "About us", href: "/about", icon: faBook },
  { id: "hand_book", text: "Handbook", href: "/handbook", icon: faTools },
];
