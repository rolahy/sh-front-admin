import {
  // mdiAccountCircle,
  mdiMonitor,
  // mdiLock,
  mdiSquareEditOutline,
  mdiTable,
  mdiResponsive,
  mdiPalette,
} from "@mdi/js";

const userRole = "apprenant";

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

// Filtrer les éléments en fonction du rôle
const filteredNavigationItems = navigationItems.filter((item) => {
  if (item.to === "/course" && userRole === "apprenant") {
    return true;
  }
  if (item.menu) {
    // Si c'est un sous-menu, filtrez également ses éléments
    item.menu = item.menu.filter((subItem) => subItem.to === "/course");
    return item.menu.length > 0;
  }
  return false;
});

export default filteredNavigationItems;
