import Route from '@ioc:Adonis/Core/Route'
Route.group(()=>{
  Route.get('testExample', 'Example/ExampleController.getExampleByLimit')
}).prefix('example').middleware('auth')
