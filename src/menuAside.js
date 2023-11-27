import {
  // mdiAccountCircle,
  mdiMonitor,
  // mdiLock,
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
    to: "/training-list",
    label: "cours",
    icon: mdiPalette,
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
  }
];
