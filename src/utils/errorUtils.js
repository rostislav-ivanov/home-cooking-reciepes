const mongoose = require("mongoose");

// exports.getErrors = (error) => {
//   if (error instanceof mongoose.Error.ValidationError) {
//     return Object.values(error.errors)[0].message;
//     //return Object.values(error.errors).map((value) => value.message);
//   } else if (error instanceof mongoose.Error.CastError) {
//     return ["Resource not found"];
//   } else {
//     return [error.message];
//   }
// };

exports.parseError = (err) => {
  if (err instanceof Error) {
    if (!err.errors) {
      // Geniric error
      err.errors = [err.message];
    } else {
      // Mongoose validation error
      const error = new Error("Input validation error");
      error.errors = Object.fromEntries(
        Object.values(err.errors).map((e) => [e.path, e.message])
      );
      return error;
    }
  } else if (Array.isArray(err)) {
    // Express-validator error
    const error = new Error("Input validation error");
    error.errors = Object.fromEntries(err.map((e) => [e.path, e.msg]));
    return error;
  }

  return err;
};
