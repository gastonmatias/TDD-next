import * as yup from 'yup';

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('The email is required!')
        .email('the email is not valid'),
    password: yup.string().required('The password is required!')
}).required();

