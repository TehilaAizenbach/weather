export const usernameValidation=(text)=>{
    const pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){0,3}\D*$)[A-Za-z\d]{1,6}$/;
    console.log(pattern.test(text));
   return pattern.test(text); 
  }

export const personalNumberValidation=(text)=>{
    const pattern=/^\d+$/
    return pattern.test(text); 
}