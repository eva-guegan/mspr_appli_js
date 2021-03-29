const userTab = [];

/**
 * @param {String} email
 * @param {String} password
 *
 * @return {?Object}
 */
function api(email, password) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8083/users/search/findByEmailAndMdp?email='+ email + '&mdp=' + password, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            console.log(response);
            userTab["email"] = response.email;
            userTab["password"] = response.mdp;
            console.log(userTab)
            return userTab
        }
    };
    xhr.send();
}

/**
 * @param {String} email
 * @param {String} password
 *
 * @return {?Object}
 */
function login(email, password) {

    let test = api(email, password)
    if (test) {
        console.log('test')
    } else {
        console.log('dans le else')
    }

    if (email === userTab["email"] && password === userTab["password"]) {
        let user = {
            email,
            password
        }

        return user
    } else {
        return null
    }

}

export { login };