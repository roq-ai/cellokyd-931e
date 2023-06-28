import * as yup from 'yup';

export const dealerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
});
