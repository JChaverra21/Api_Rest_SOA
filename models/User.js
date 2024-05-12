import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

// Schema antes de guardar
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error al encriptar la contraseña");
  }
});

// Schema para comparar contraseñas
userSchema.methods.comparePassword = async function (frontpassword) {
  return await bcryptjs.compare(frontpassword, this.password);
};

export const User = model("User", userSchema);
