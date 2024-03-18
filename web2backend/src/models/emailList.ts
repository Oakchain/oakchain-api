import { mongoose, Validator } from './helpers/imports';

const { isEmail } = Validator;

const EmailListSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: [isEmail, 'Please add a valid email address'],
      sparse: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

EmailListSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('EmailList', EmailListSchema);
