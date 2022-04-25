import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/add/", "TimeSlots/TimeSlotsController.add")
    Route.get("/available","TimeSlots/TimeSlotsController.available")
}).prefix("time-slots")