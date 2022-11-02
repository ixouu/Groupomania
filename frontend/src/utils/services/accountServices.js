let saveToken = (token) => {
    localStorage.setItem('token', token); 
}

let saveUserId = (userId) => {
    localStorage.setItem('userId', userId);
}

let saveRoles = (roles) => {
    localStorage.setItem('roles', roles);
}

let logout = () => {
    localStorage.clear();
}

let getUserId = () => {
    let userid = localStorage.getItem('userId');
    return userid
}

let getUserToken = () => {
    return localStorage.getItem('token');
}

let isLog = () => {
    let token = localStorage.getItem('token');
    return !!token
}

let isAdmin = () => {
    let roles = localStorage.getItem('roles').split(',');
    let admin = roles.includes('5150');
    return !!admin
}

let transformDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const rawDate = Date.parse(date);
    const dateToReturn = new Date(rawDate).toLocaleDateString('fr-FR', options);
    return dateToReturn.toString();
}

let getTime = (date) => {
    const rawDate = Date.parse(date);
    const timeToReturn = new Date(rawDate).toLocaleTimeString('fr-FR', { timeStyle: "short" });
    return timeToReturn.toString();
}

export const accountServices = {
    saveToken,
    saveUserId,
    saveRoles,
    getUserId,
    getUserToken,
    logout,
    isLog,
    isAdmin,
    transformDate,
    getTime
}