/**
 * Validates a given input based on its type.
 * @param {string} input - The value to validate.
 * @param {string} type - The type of validation to perform ('email', 'password').
 * @returns {string|null} An error message string if invalid, otherwise null.
 */
export const validateInput = (input, type) => {
  switch (type) {
    case 'email':
      if (!input) {
        return "Email address is required.";
      }
      if (!/\S+@\S+\.\S+/.test(input)) {
        return "Email address is invalid.";
      }
      return null; // No error

    case 'password':
      if (!input) {
        return "Password is required.";
      }
      if (input.length < 6) {
        return "Password must be at least 6 characters.";
      }
      return null; // No error

    default:
      return null; // No validation for this type
  }
};

/**
 * Validates that two passwords match. This is kept separate
 * as it requires two inputs.
 * @param {string} password - The original password.
 * @param {string} confirmPassword - The password for confirmation.
 * @returns {string|null} An error message string if they don't match, otherwise null.
 */
export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
}; 