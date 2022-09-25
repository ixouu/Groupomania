const getTimeDifference = (timestamp) => {
 const getTimeNow = Date.now();
 const timestampParsed = Date.parse(timestamp);
 const timeDifference = getTimeNow - timestampParsed;
 // less than 1 min 
 if( timeDifference < 60000){
    return '1 min';
 }
 console.log(timeDifference % 6000)
 // more than a minute less than a hour 
if (timeDifference > 60000 && timeDifference < 3600000){
    const minutes = Math.round(timeDifference / 60000)
    if (minutes === 1) {
        return `${minutes} minute`;
    } else {
        return `${minutes} minutes`;
    }
}
// more than a hours and less than a day
if (timeDifference > 3600000 && timeDifference < 86400000){
    const hours = Math.round(timeDifference / 3600000);
    if ( hours === 1){
        return `${hours} heure`
    } else{
        return `${hours} heures`
    }
}
// more than a day and less than a week
if (timeDifference > 86400000 && timeDifference < 604800000){
    const days = Math.round(timeDifference / 86400000)
    if(days === 1 ){
        return `${days} jour`;
    } else {
        return `${days} jours`
    }
}
// more than a week
if (timeDifference > 604800000){
    const weeks = Math.round(timeDifference / 604800000)
    return `${weeks} sem.`
}
}

export const commentServices = {
    getTimeDifference
}