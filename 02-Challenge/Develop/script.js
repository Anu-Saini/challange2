// Assignment Code

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    const password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

function generatePassword() {
    const criteria = generatePrompt();
    const pool = checkCriteria(criteria);
    const pwd = generateRandomPassword(pool, "");
    return shufflePassword(pwd.split("")).join("");
}

function generatePrompt() {
    const pwdLength = prompt(
        "Password should be atleast 8 characters and no longer than 128 characters."
    );
    const pwdCase = prompt(
        "Password should contain a combination uppercase and lowercase letters."
    );
    const pwdNumber = prompt("Password should contain atleast 1 number.");
    const pwdspecialChar = prompt(
        "Password should contain atleast 1 special characters."
    );
    return {
        length: pwdLength,
        case: pwdCase,
        number: pwdNumber,
        specialChar: pwdspecialChar,
    };
}

function checkCriteria(criteria) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const special = "!@#$%^&*()";
    let pwdPool = [lower];
    if (criteria.case) pwdPool.push(upper);
    if (criteria.number) pwdPool.push(number);
    if (criteria.specialChar) pwdPool.push(special);
    return { pool: pwdPool, length: criteria.length };
}

function generateRandomPassword(pool, pwd) {
    const minLength = pool.length ? 8 : 1;

    pool.pool.forEach((element) => {
        const start = Math.floor(Math.random() * element.length);
        const end = Math.floor(Math.random() * (element.length - start));
        pwd += element.substring(start, end);
    });
    while (pwd.length < minLength) generateRandomPassword(pool, pwd);
    return pwd;
}

function prompt(text) {
    return confirm(text);
}

function shufflePassword(value) {
    for (var i = value.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = value[i];
        value[i] = value[j];
        value[j] = temp;
    }
    return value;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);