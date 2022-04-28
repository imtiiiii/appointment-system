import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.post("/request", "Appointment/AppointmentsController.request") //By Student
    Route.get('/upCommingAppoinments', "Appointment/AppointmentsController.upCommingAppoinments") //By teacher
    Route.get("/", "Appointment/AppointmentsController.appointments") //By teacher
    Route.put("/status","Appointment/AppointmentsController.status") // By teacher
}).prefix("appointments")