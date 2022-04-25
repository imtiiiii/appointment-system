import {schema,rules} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class TimeSlotValidator {
    public async created(ctx:HttpContextContract){
        const availableSlotSchema = schema.create({
            day: schema.number()
        });

        try {
            const payload =  await ctx.request.validate({schema:availableSlotSchema});
            return payload;
        } catch (error) {
            const errorObject = JSON.stringify(error.messages);
            throw errorObject
        }
    }
}