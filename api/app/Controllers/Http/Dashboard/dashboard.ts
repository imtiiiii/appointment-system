import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/", "Dashboard/DashboarAdminsController.test")
    Route.get("/request", "Dashboard/DashboarAdminsController.requested")
    Route.put("/update/status", "Dashboard/DashboarAdminsController.updateStatus")
    Route.get("/student-list/", "Dashboard/DashboarAdminsController.studentList")
    Route.get("/teacher-list/", "Dashboard/DashboarAdminsController.teacherList")
}).prefix("dashboard")