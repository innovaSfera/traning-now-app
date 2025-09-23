import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "Menu Principal",
    items: [
      {
        title: "Calendário",
        url: "/",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Treinos",
        icon: Icons.Table,
        items: [
          {
            title: "Personal",
            url: "/training",
          },
          {
            title: "Aluno",
            url: "/trainingStudent",
          },
        ],
      },
      {
        title: "Perfil",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Login",
        icon: Icons.Authentication,
        url: "/auth/sign-in",
        items: [],
      },
    ],
  },
];
