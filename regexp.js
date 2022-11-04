function mailValidation(mail) {
   return mail.match(/^[a-z\d][a-z\d-.+]{1,19}@[a-z.!$%&’*+/=?^_-]{1,15}\.[a-z]{1,5}$/i) != null;

}

function phoneValidation(phone) {
    if (phone.langth > 25) {
        return false;
    }
    return phone.match(/^-*\s*(\+*\s*-*\d\s*-*\d)?-*\s*\(?(-*\s*\d){3}\)?(-*\s*\d){7}\s*$/) != null;
} 

function passwordValodation(password) {
    password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d]{8,}/) != null;
}

console.log("///////////////////////////////////////////////////////////////////////");
console.log("MAIL");
console.log("///////////////////////////////////////////////////////////////////////");
//valid
console.log(mailValidation("fi@secondpart.end") + " must be true");
console.log(mailValidation("first-part@.se=cond%p.art.end") + " must be true" );
console.log(mailValidation("first.part@se=cond%part.r") + " must be true");

//not valid
console.log(mailValidation("f@secondart.end,") + " must be false");
console.log(mailValidation("first-part@.se=cond@part.end") +  "must be false");
console.log(mailValidation("-firstpart@.se=cond%.enddeded") + " must be false");
console.log(mailValidation("firs_tpart@.se.en") + " must be false");
console.log(mailValidation("firstpart@.se.enddeded") + " must be false");
console.log("////////////////////////////////////////////////////////////////////////");
console.log("PHONE");
console.log("///////////////////////////////////////////////////////////////////////////");
//valid
console.log(phoneValidation("+38 (099) 567 8901") + " must be true");
console.log(phoneValidation("+38 099 5 6 7 8 9  01") + " must be true" );
console.log(phoneValidation("(09-9) 567-890-1") + " must be true");
console.log(phoneValidation("--  (099) 567 890-1") + " must be true");
//not valid
console.log(phoneValidation("+38 (099) 567 8901 0") + " must be false");
console.log(phoneValidation("+38 099 a0000000") +  "must be false");
console.log(phoneValidation("+38 (0989) 567 8901") + " must be false");
console.log(phoneValidation("+48 (0989) 567 8901") + " must be false");
console.log("////////////////////////////////////////////////////////////////////////");
console.log("PASSWORD");
console.log("////////////////////////////////////////////////////////////////////////");
//valid
console.log(passwordValodation("C00l_Pass") + " must be true");
console.log(passwordValodation("SupperPas1") + " must be true" );

//not valid
console.log(passwordValodation("Cool_pass") + " must be false");
console.log(passwordValodation("C00l") +  "must be false");
