const userTab = [];
let idUser = null;

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
            userTab["email"] = response.email;
            userTab["password"] = response.mdp;

            let url = response._links.self.href
            url = url.split("/")
            idUser = url[url.length-1]
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

    api(email, password)

    if (email === userTab["email"] && password === userTab["password"]) {
        let user = {
            id: idUser,
            email,
            password
        }

        return user
    } else {
        return null
    }

}

export { login };