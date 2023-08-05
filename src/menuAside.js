import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiSquareEditOutline,
  mdiTable,
  mdiTelevisionGuide,
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
    to: "/ui",
    label: "Niveaux",
    icon: mdiTelevisionGuide,
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
    label: "Videos",
    icon: mdiPalette,
    menu: [
      {
        to: "/",
        label: "Pro",
      },
      {
        to: "/",
        label: "Free",
      },
    ],
  },
  {
    to: "/profile",
    label: "Quiz",
    icon: mdiAccountCircle,
  },
  {
    to: "/responsive",
    label: "Questions",
    icon: mdiLock,
  },
];
