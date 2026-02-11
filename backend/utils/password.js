import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRound = 10;
  // const salt = bcrypt.genSalt(saltRound, (err, salt) => {
  //   if (err) {
  //     console.log("cant do salting");
  //     return;
  //   }
  // });

  const hash = await bcrypt.hash(password, saltRound);
  if (hash) {
    return hash;
  }
};

export const confirmPassword = async (password, userPassword) => {
  const confirmed = await bcrypt.compare(password, userPassword);
  if (!confirmed) {
    console.log("cant confirm password");
  }
  return confirmed;
};
