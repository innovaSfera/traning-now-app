import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "Menu Principal",
    items: [
      {
        title: "Calendário",
        url: "/calendar",
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
        title: "Anamnese",
        url: "/anamnese",
        icon: Icons.ClipboardList,
        items: [],
      },
      {
        title: "Financeiro",
        url: "/financial",
        icon: Icons.CreditCard,
        items: [],
      },
      {
        title: "Academia",
        url: "/academy",
        icon: Icons.Academy,
        items: [],
      },
      {
        title: "Perfil",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
];
