import User from "App/Models/User"

export default class ProfileQuery {
    async profileUpdate(data) {
        console.log("update data called", data);
        const user = await User.findOrFail(data.id);
        console.log("user=", user)
        console.log("loop starting")
        // Object.keys(data).forEach((value) => {
        //     console.log("value=", value)
        //     if (value != 'id') {
        //         user[value] = data[value];
        //     }
        // })
        console.log("user at last= ", user);
        await user.merge(data).save();
    }
}