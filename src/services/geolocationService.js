export function getLocation(renderPosition) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latlong = position.coords.latitude + ',' + position.coords.longitude;
            renderPosition(latlong);
        }, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

export function showError(error) {

    console.log('Geolocation error!' + error.message)

    // switch (error.code) {
    //     case error.PERMISSION_DENIED:
    //     daysForecast.innerHTML = 'User denied the request for Geolocation.'
    //     break
    //     case error.POSITION_UNAVAILABLE:
    //     daysForecast.innerHTML = 'Location information is unavailable.'
    //     break
    //     case error.TIMEOUT:
    //     daysForecast.innerHTML = 'The request to get user location timed out.'
    //     break
    //     case error.UNKNOWN_ERROR:
    //     daysForecast.innerHTML = 'An unknown error occurred.'
    //     break
    // }

}
