import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/", "Dashboard/DashboarAdminsController.test")
}).prefix("dashboard")