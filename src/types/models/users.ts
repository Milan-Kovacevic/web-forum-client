export type RegistrationRequest = {
  requestId: string;
  submitDate: string;
  username: string;
  userDisplayName: string;
  userEmail?: string;
};

export type RegisteredUser = {
  userId: string;
  displayName: string;
  isEnabled: boolean;
  roleId: number;
};

export type SingleRegisteredUser = {
  userId: string;
  displayName: string;
  isEnabled: boolean;
  roleId: number;
  isExternallyAuthenticated: boolean;
  permissions: UserPermission[];
};

export type UserPermission = {
  permissionId: number;
  permissionName: string;
  roomId: string;
};
