const mapping: Record<string, string> = {
  administrators: 'administrator',
  dealers: 'dealer',
  'guest-users': 'guest_user',
  organizations: 'organization',
  'team-members': 'team_member',
  users: 'user',
  vendors: 'vendor',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
