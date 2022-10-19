const bcrypt = require("bcrypt");

const login = async () => {
  const password = "password1";
  const hash = await bcrypt.hash(password, 13);
  const isMatch = await bcrypt.compare("password1", hash);
  console.log(isMatch);
};

login();
