import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiSquareEditOutline,
  mdiTable,
  mdiResponsive,
  mdiPalette,
} from "@mdi/js";

const navigationItems = [
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
    to: "/course",
    label: "cours",
    icon: mdiPalette,
  },
  {
    to: "/submit-project",
    label: "Déposer projet",
    icon: mdiAccountCircle,
  },
  {
    to: "/lists-child",
    label: "liste des filleuls",
    icon: mdiAccountCircle,
  },
  {
    to: "/lists-project",
    label: "Listes des projets",
    icon: mdiLock,
  },
  {
    to: "/sponsorship",
    label: "parrainage",
    icon: mdiAccountCircle,
  }
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
];

export default navigationItems;
