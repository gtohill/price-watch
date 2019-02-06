function checkURL(){
  document.addEventListener("click", (e) => {
    
    function urlStatus(data){
      if(currentBookmark){
        document.getElementById('popup-success').innerHTML = "SUCCESS";
      }else{
        document.getElementById('popup-success').innerHTML = "FAILED... :(";
      }
      
    }

    function postData(url = ``, data = {}) {
      // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses response to JSON
    }

    function submitURL() {     

      postData(`http://127.0.0.1:5000/post`, {url:currentTab.url})
      .then(function(data) {
        urlStatus(data);
      })
      .catch(error => console.error(error)); 
    }
    submitURL();
  })
}

export default checkURL;