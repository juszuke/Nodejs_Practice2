const { body } = require('express-validator');

module.exports = [
  body('username').not().isEmpty().withMessage('NAME は必ず入力して下さい'),
  body('email')
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('MAIL はメールアドレスを記入して下さい'),
  body('password')
    .not()
    .isEmpty()
    .isLength({ min: 7 })
    .withMessage('Password は7文字以上にしてください'),
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password と Confirm Password が一致していません');
    }
    return true;
  }),
];
