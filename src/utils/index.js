export const hasRole = (auth, role) => {
  return (
    auth.userConnected &&
    auth.userConnected.roles &&
    auth.userConnected.roles.length > 0 &&
    auth.userConnected.roles[0].role.includes(role)
  );
};
