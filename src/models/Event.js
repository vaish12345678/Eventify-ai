import mongoose from "mongoose";
const attendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  ticketType: { type: String, default: "General" },
  checkedIn: { type: Boolean, default: false },
});
const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    date: String,
    location:String,
    attendees: [attendeeSchema],
    audience: String,
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } 
);


export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema);
