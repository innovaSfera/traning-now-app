import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MENU",
    items: [
     
      {
        title: "Calendário",
        url: "/",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Treinos",
        url: "/training",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Perfil",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Login",
        url: "/auth/sign-in",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];
