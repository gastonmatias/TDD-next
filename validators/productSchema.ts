import * as yup from 'yup';

export type ProductFormData = yup.InferType<typeof productSchema>;

export const productSchema = yup.object({
    name: yup.string().required('The name is required!'),
    size: yup.string().required('The size is required!'),
    type: yup.string().required('The type is required!')
}).required();

