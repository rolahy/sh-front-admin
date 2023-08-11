import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiSquareEditOutline,
  mdiTable,
  mdiResponsive,
  mdiPalette,
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/users",
    label: "Utilisateurs",
    icon: mdiTable,
  },
  {
    to: "/roles",
    label: "Role",
    icon: mdiSquareEditOutline,
  },
  {
    label: "Formations",
    icon: mdiResponsive,
    menu: [
      {
        to: "/training-list",
        label: "Listes",
      },
      {
        to: "/training",
        label: "Créer Formation",
      },
    ],
  },
  {
    label: "Type formation",
    icon: mdiPalette,
    menu: [
      {
        to: "/",
        label: "Pro",
      },
      {
        to: "/",
        label: "Gratuit",
      },
    ],
  },
  // {
  //   to: "/profile",
  //   label: "Quiz",
  //   icon: mdiAccountCircle,
  // },
  // {
  //   to: "/responsive",
  //   label: "Questions",
  //   icon: mdiLock,
  // },
];
