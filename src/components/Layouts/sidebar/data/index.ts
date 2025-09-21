import * as Icons from "../icons";

export const NAV_DATA = [
  {
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
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Login",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
