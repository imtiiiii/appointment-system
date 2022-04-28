import {schema,rule} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AppointmentValidator{
    public async status(ctx:HttpContextContract){
        const statusIdSchema = schema.create({
            appointmentId: schema.number(),
        });
        try {
            const payload = await ctx.request.validate({schema:statusIdSchema});
            return payload;
        } catch (error) {
            console.log(error);
            
        }
    }
}