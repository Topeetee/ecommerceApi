// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// // Perform password validation using the regex pattern
// if (!req.body.password || !passwordRegex.test(req.body.password)) {
//   return res.status(400).json({
//     error:
//       'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
//   });
// }

// module.exports = {passwordRegex}