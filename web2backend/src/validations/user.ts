import joi from './imports';

const user = {
  async validateCreateUser(payload: any) {
    const schema = joi.object({
      username: joi.string().required().label('Username is required'),
      firstname: joi.string().optional().label('Firstname is required'),
      lastname: joi.string().optional().label('Lastname is required'),
      email: joi.string().email().required().label('Email is required'),
      password: joi.string().label('Password is required'),
      gender: joi
        .string()
        .valid('male', 'female', 'prefer not to say')
        .optional()
        .label('Gender is required. Male, Female or Prefer not to say'),
      dob: joi
        .date()
        .format('YYYY-MM-DD')
        .allow('')
        .optional()
        .label('Date of birth is required. Format should be YYYY-MM-DD'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateUpdateUser(payload: any) {
    const schema = joi.object({
      firstname: joi.string().optional().label('Firstname'),
      lastname: joi.string().optional().label('Lastname'),
      gender: joi
        .string()
        .valid('male', 'female', 'prefer not to say')
        .optional()
        .label('Gender. Male, Female or Prefer not to say'),
      dob: joi
        .date()
        .format('YYYY-MM-DD')
        .allow('')
        .optional()
        .label('Date of birth. Format should be YYYY-MM-DD'),
      address: joi.string().optional().label('address'),
      city: joi.string().optional().label('city'),
      state: joi.string().optional().label('state'),
      phoneNumber: joi.string().optional().label('phoneNumber'),
      socialLinks: joi
        .object({
          twitter: joi.string().optional().label('twitter'),
          linkedin: joi.string().optional().label('linkedIn'),
          github: joi.string().optional().label('github'),
        })
        .optional()
        .label('social'),
      about: joi.string().optional().label('about'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default user;
