import Route from '@ioc:Adonis/Core/Route'
Route.group(()=>{
//   Route.get('testExample', 'Example/ExampleController.getExampleByLimit')
    Route.get('/:id','Profile/ProfileController.getProfileDetails')
    Route.put('/update','Profile/ProfileController.updateProfile')
}).prefix('profile')
