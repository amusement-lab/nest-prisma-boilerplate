export const ModulePermissions = {
  ALL: 'ALL',
  USER_MODULE: 'USER_MODULE',
  STUDENT_MODULE: 'STUDENT_MODULE',
};

export type ModulePermissions =
  (typeof ModulePermissions)[keyof typeof ModulePermissions];
