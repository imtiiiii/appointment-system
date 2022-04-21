import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/", "Dashboard/DashboarAdminsController.test")
    Route.get("/request", "Dashboard/DashboarAdminsController.requested")
    Route.put("/update/status", "Dashboard/DashboarAdminsController.updateStatus")
}).prefix("dashboard")