export const shortcuts = {
  allDisabled: {
    data: {
      "leave.assign_leave": false,
      "leave.leave_list": false,
      "leave.apply_leave": false,
      "leave.my_leave": false,
      "time.employee_timesheet": false,
      "time.my_timesheet": false,
    },
    meta: [],
    rels: [],
  },
  allEnabled: {
    data: {
      "leave.assign_leave": true,
      "leave.leave_list": true,
      "leave.apply_leave": true,
      "leave.my_leave": true,
      "time.employee_timesheet": true,
      "time.my_timesheet": true,
    },
    meta: [],
    rels: [],
  },
  twoEnabled: {
    data: {
      "leave.assign_leave": false,
      "leave.leave_list": false,
      "leave.apply_leave": false,
      "leave.my_leave": true,
      "time.employee_timesheet": false,
      "time.my_timesheet": true,
    },
    meta: [],
    rels: [],
  },
} as const;

export type ShortcutsMockType = typeof shortcuts;
