
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const resultArea = document.getElementById("resultCont");
let btn = document.querySelector(".btn");

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let email = document.getElementById("username").value;
    resultArea.innerHTML=`<img width="32px" src="img/Spinner-1s-200px.svg" alt="loader">`
    //when we click submit this loader will executed untill url get fetched as shown in try block below

    if (!isValidEmail(email)) {
        resultArea.innerHTML = "<div>Please enter a valid email address.</div>";
        return;
    } /*we cant use this inside loop as it might be
     overridden by subsequent iterations. You should move the email
      format validation outside the loop to ensure that it is checked only once. */

    let key = "ema_live_WWRidmrZTV3bBdloXJjoAuJpr93eWy8jXBH0Fw1N";
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

try{
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }

    let result = await res.json();

    let str = "";
    for (let key of Object.keys(result)) {
        if (result[key] !== '' && result.email !== '') {
            str = str + `<div>${key}: ${result[key]}</div>`;

            resultArea.innerHTML = str;
        }
    }
    
}catch(error){
    console.log(error);
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        resultArea.innerHTML = "<div><h3>Oops! No internet connection. Please try again later🚫</h3></div> ";
    } else {
        resultArea.innerHTML = "<div>Something went wrong. Please try again.</div>";
    }
}
    
 

});
