import User from "App/Models/User"

export default class ProfileQuery {
    async profileUpdate(data){
        const user = await User.findOrFail(data.id);
        Object.keys(data).forEach((value)=>{
            if(value != 'id'){
                user[value] = data[value];
            }
        })
        // console.log(user);
        await user.save()
    }
}