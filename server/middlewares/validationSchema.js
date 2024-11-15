import Joi from "joi";

export const registerUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.base": `"fullname" should be a type of 'text'`,
    "string.empty": `"fullname" cannot be an empty field`,
    "string.min": `"fullname" should have a minimum length of {#limit}`,
    "any.required": `"fullname" is a required field`,
  }),

  userName: Joi.string().min(3).max(30).required().messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.empty": `"username" cannot be an empty field`,
    "string.min": `"username" should have a minimum length of {#limit}`,
    "any.required": `"username" is a required field`,
  }),

  address: Joi.string().min(5).max(100).required().messages({
    "string.base": `"address" should be a type of 'text'`,
    "string.empty": `"address" cannot be an empty field`,
    "string.min": `"address" should have a minimum length of {#limit}`,
    "any.required": `"address" is a required field`,
  }),

  email: Joi.string().email().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "string.email": `"email" must be a valid email address`,
    "any.required": `"email" is a required field`,
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": `"password" should be a type of 'text'`,
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),

  role: Joi.string().valid("user", "admin").default("user").messages({
    "string.base": `"role" should be a type of 'text'`,
    "any.only": `"role" must be one of ['user', 'admin']`,
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "string.email": `"email" must be a valid email address`,
    "any.required": `"email" is a required field`,
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": `"password" should be a type of 'text'`,
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
});

// Product validation schema
export const validateProduct = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),

  description: Joi.string().min(10).max(500).required().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "string.min": `"description" should have a minimum length of {#limit}`,
    "any.required": `"description" is a required field`,
  }),

  price: Joi.number().positive().required().messages({
    "number.base": `"price" should be a type of 'number'`,
    "number.positive": `"price" should be a positive number`,
    "any.required": `"price" is a required field`,
  }),

  category: Joi.string().min(3).max(50).required().messages({
    "string.base": `"category" should be a type of 'text'`,
    "string.empty": `"category" cannot be an empty field`,
    "string.min": `"category" should have a minimum length of {#limit}`,
    "any.required": `"category" is a required field`,
  }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": `"stock" should be a type of 'number'`,
    "number.integer": `"stock" should be an integer`,
    "number.min": `"stock" cannot be less than {#limit}`,
    "any.required": `"stock" is a required field`,
  }),

  // Optionally you can validate the image file if it's provided in a different way (not with Multer)
  // image: Joi.string().uri().optional().messages({
  //   "string.base": `"image" should be a valid URI`,
  // }),
});
