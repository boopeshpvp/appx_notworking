import { lazy } from "react";

export const publicRoutes = [

  {
    routeId: "R001",
    name: "Login",
    path: "/",
    component: lazy(() => import("../containers/login")),
  },

  {
    routeId: "R003",
    name: "Forget Password",
    path: "/forgetpassword",
    component: lazy(() => import("../containers/forgetpassword")),
  },

  {
    routeId: "R004",
    name: "Verification",
    path: "/verification",
    component: lazy(() => import("../containers/verification")),
  },
  {
    routeId: "R005",
    name: "ResetPassword",
    path: "/resetpassword",
    component: lazy(() => import("../containers/changepassword")),
  },

];

export const adminPrivateRoutes = [
  {
    routeId: "R011",
    name: "Admin Dashboard",
    path: "/admin/dashboard",
    component: lazy(() => import("../containers/admin-panel/dashboard")),
  },
  {
    routeId: "R012",
    name: "Detail View",
    path: "/admin/detailview/:id",
    component: lazy(() => import("../containers/admin-panel/detail-view")),
  },
  {
    routeId: "R013",
    name: "Profile",
    path: "/admin/profile",
    component: lazy(() => import("../containers/profile/new-personal-information")),
  },
  {
    routeId: "R014",
    name: "AddEmployee",
    path: "/admin/addemployee",
    component: lazy(() => import("../containers/admin-panel/addEmployee")),
  },
  {
    routeId: "R015",
    name: "Employeelist",
    path: "/admin/employeelist",
    component: lazy(() => import("../containers/admin-panel/employee-list")),
  },
  {
    routeId: "R022",
    name: "EventCalendar",
    path: "/admin/eventcalendar",
    component: lazy(() => import("../containers/admin-panel/EventCalendar"))
  },
  {
    routeId: "R023",
    name: "Settings",
    path: "/admin/settings",
    component: lazy(() => import("../containers/admin-panel/settings"))
  },
]

export const userPrivateRoutes = [
  {
    routeId: "R016",
    name: "homepage",
    path: "/user/home",
    component: lazy(() => import("../containers/user-panel/home")),
  },
  {
    routeId: "R017",
    name: "userprofilepage",
    path: "/user/userprofile",
    component: lazy(() => import("../containers/user-panel/userProfile")),
  },
  {
    routeId: "R018",
    name: "usereventpage",
    path: "/user/userevent",
    component: lazy(() => import("../containers/user-panel/userEvent")),
  },
  {
    routeId: "R019",
    name: "createInterview",
    path: "/user/createinterviewForm",
    component: lazy(() => import("../containers/user-panel/createInterviewForm"))
  },
  {
    routeId: "R020",
    name: "VeiwInterview",
    path: "/user/veiwInterveiwDetail",
    component: lazy(() => import("../containers/user-panel/veiwInterview"))
  },
  {
    routeId: "R019",
    name: "Reset Password",
    path: "/admin/profile/change-password",
    component: lazy(() => import("../containers/profile/change-password")),
  },

];