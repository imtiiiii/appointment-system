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
    public async update(ctx:HttpContextContract){
        const updateSchema = schema.create({
            dayId: schema.number(),
            slotId: schema.number(),
            newStartTime : schema.string({trim:true},[
                rules.regex(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/)
            ]),
            newEndTime: schema.string({trim:true},[
                rules.regex(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/)
            ])
        });

        const schemaValidationMessage = {
            required:'The {{ field }} is required to create a new account',
            'newStartTime.regex': 'New Start Time Input is not valid.(ex: hh:mm:ss)',
            'endStartTime.regex': 'New Start Time Input is not valid.(ex: hh:mm:ss)'

        }

        try {
            await ctx.request.validate({schema:updateSchema,messages:schemaValidationMessage})
        } catch (error) {
            const errorStringigyObj = JSON.stringify(error.messages);
            throw errorStringigyObj;
        }
    }
}