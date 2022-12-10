import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
interface UserAttrs {
  email: string,
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  createAt: string;
  updateAt: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);


userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await bcrypt.hash(this.get('password'), 10);
    this.set('password', hashed);
  }
  done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };