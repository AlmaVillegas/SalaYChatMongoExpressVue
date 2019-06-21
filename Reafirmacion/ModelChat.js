var mongoose = require('mongoose'), Schema = mongoose.Schema;
var RoomSchema = new mogoose.schema({
    room_name: String,
    created_date: { type: Date, default: Date.now},
});
module.exports= mongoose.model('Room', RoomSchema);