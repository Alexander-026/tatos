function generatePassword(): string {
  const length = 15;

  // Character pools for each requirement
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&?";

  const getRandomChar = (chars: string): string =>
    chars[Math.floor(Math.random() * chars.length)];

  // Ensure the password meets all requirements
  let password = [
    getRandomChar(lowercaseChars),
    getRandomChar(uppercaseChars),
    getRandomChar(numberChars),
    getRandomChar(specialChars),
  ];

  // Fill the rest of the password with random characters from all pools
  const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;

  while (password.length < length) {
    password.push(getRandomChar(allChars));
  }

  // Shuffle the password to ensure randomness
  password = password.sort(() => Math.random() - 0.5);

  return password.join('');
}

export default generatePassword