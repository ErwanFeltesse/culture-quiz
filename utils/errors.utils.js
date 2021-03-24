module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
    if (err.message.includes("pseudo"))
      errors.pseudo = "Pseudo incorrect ou déjà pris";
    if (err.message.includes("email")) errors.email = "Email incorrect";
    if (err.message.includes("password"))
      errors.password =
        " le mot de passe n'est pas assez long. 6 caractères nécessaires";
    if (err.code === "11000" && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.message.includes("email")) errors.email = "Email inconnu";
    if (err.message.includes("password"))
      errors.password = "le mot de passe ne correspond pas";
    return errors;
  };
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: "", maxSize: "" };
  
    if (err.message.includes("invalid file"))
      errors.format = "Format incompatible";
  
    if (err.message.includes("max size reached"))
      errors.maxSize = "le fichier dépasse 500 ko";
  
    return errors;
  };
  