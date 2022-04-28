import {schema,rule} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AppointmentValidator{
    public async status(ctx:HttpContextContract){
        const statusIdSchema = schema.create({
            appointmentId: schema.number(),
            status: schema.string({trim:true})
        });
        const validationMessage = {
            required:'The {{ field }} is required to create a new account',
            'appointmentId.number': "appointmentId must be a valid number",
            'status.string': "appointmentId must be a valid number on string format.Ex: Valid Range ['0','1','2']",
        }
        try {
            const payload = await ctx.request.validate({schema:statusIdSchema,messages:validationMessage});
            return payload;
        } catch (error) {
            const errorString = JSON.stringify(error.messages);
            throw errorString
        }
    }
}