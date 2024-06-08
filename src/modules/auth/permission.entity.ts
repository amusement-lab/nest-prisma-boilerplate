// You can save this enum directly in database, but, why save the enum here, is because for simpler data management in the future

export const ModulePermissions = {
  ALL: 'ALL',
  USER_MODULE: 'USER_MODULE',
  STUDENT_MODULE: 'STUDENT_MODULE',
};

export type ModulePermissions =
  (typeof ModulePermissions)[keyof typeof ModulePermissions];
