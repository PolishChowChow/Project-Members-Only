const express = require("express");
const {
  get_homepage,
  get_log_in,
  post_log_in,
  get_log_out,
} = require("../controllers/logController");
const {
  get_sign_up,
  post_sign_up,
} = require("../controllers/signUpController");
const {
  get_add_message,
  post_add_message,
  post_message_remove,
} = require("../controllers/messageController");
const {
  get_upgrade_membership,
  get_upgrade_membership_to_admin,
  post_upgrade_membership_to_admin,
  post_upgrade_membership,
} = require("../controllers/membershipController");
const { passwordMatch } = require("../validators/confirmPasswordMatch");
const { body } = require("express-validator");
const { doesUserWithThisUsernameExists } = require("../validators/isUserInDb");
const router = express.Router();

/* GET home page. */
router.get("/", get_homepage);
router.get("/log-out", get_log_out);

router
  .route("/sign-up")
  .get(get_sign_up)
  .post(
    body("first_name")
      .notEmpty()
      .withMessage("First name is not provided")
      .isLength({
        min: 5,
      })
      .withMessage("First name should have at least 5 characters")
      .isLength({
        max: 50,
      })
      .withMessage("First name should have max 50 characters"),
    body("last_name")
      .notEmpty()
      .withMessage("Last name is not provided")
      .isLength({
        min: 5,
      })
      .withMessage("Last name should have at least 5 characters")
      .isLength({
        max: 50,
      })
      .withMessage("Last name should have max 50 characters"),
    body("username")
      .notEmpty()
      .withMessage("Username is not provided")
      .custom(doesUserWithThisUsernameExists)
      .withMessage("Username already in use")
      .isLength({
        min: 5,
      })
      .withMessage("Username should have at least 5 characters")
      .isLength({
        max: 100,
      })
      .withMessage("Username should have max 100 characters"),
    body("password")
      .notEmpty()
      .withMessage("Password field is empty")
      .isLength({
        min: 5,
      })
      .withMessage("Password should have at least 5 characters")
      .isLength({
        max: 100,
      })
      .withMessage("Password should have max 100 characters")
      .isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: true,
      })
      .withMessage(
        "Password should contain lower case letter, upper case letter, number and symbol"
      ),
    body("confirm-password")
      .notEmpty()
      .withMessage("Confirm password field is empty")
      .custom(passwordMatch)
      .withMessage("Passwords do not match"),
    post_sign_up
  );

router
  .route("/log-in")
  .get(get_log_in)
  .post(post_log_in);

router
  .route("/message/add")
  .get(
    body("title").notEmpty().withMessage("Title field is empty"),
    body("content").notEmpty().withMessage("Content field is empty"),
    get_add_message
  )
  .post(post_add_message);

router
  .route("/upgrade-to-member")
  .get(get_upgrade_membership)
  .post(
    body("code").notEmpty().withMessage("Code field is empty"),
    post_upgrade_membership
  );

router
  .route("/upgrade-to-admin")
  .get(get_upgrade_membership_to_admin)
  .post(
    body("code").notEmpty().withMessage("Code field is empty"),
    post_upgrade_membership_to_admin
  );

router.post("/message/delete/:id", post_message_remove);
module.exports = router;
