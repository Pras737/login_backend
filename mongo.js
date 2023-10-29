import { connect, Schema, model } from "mongoose";

const mongoConnect = async () => {
  await connect(
    "mongodb+srv://at1484746:zaq12345@cluster0.plkbnme.mongodb.net/?retryWrites=true&w=majority"
  ).catch((err) => {
    console.log("Mongo connection failed ", err.message);
    throw err;
  });
  console.log("mongo connection successfull");
};

// Define a simple data model and schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  login: Boolean,
  age: String,
  gender: String,
  dob: String,
  mobile: String,
});

export default mongoConnect;
export const userData = model("Data", userSchema);
