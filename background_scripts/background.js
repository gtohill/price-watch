let currentTab;
let currentBookmark = false;
let acceptable_urls;
let session_token;

/*
* get acceptable urls. 
*/
function getURLS(){
  fetch('http://127.0.0.1:5000/')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    acceptable_urls = myJson;    

  });
}


/*
 * Updates the browserAction icon to reflect whether the current page
 * is acceptable.
 */
function updateIcon() {
  browser.browserAction.setIcon({
    path: currentBookmark ? {
      19: "icons/star-filled-19.png",
      38: "icons/star-filled-38.png"
    } : {
      19: "icons/star-empty-19.png",
      38: "icons/star-empty-38.png"
    }    
  });
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: currentBookmark ? 'Acceptable' : 'Not Acceptable'
  });   
}

function updateActiveTab(tabs) {   
  /* get acceptable urls for processing user visited website */
  getURLS();  

  function updateTab(tabs) {  

    if (tabs[0]) {      
      
      let flag = false;
      currentTab = tabs[0];      
      
      for(let url in acceptable_urls){
        //console.log(url);
        let item = acceptable_urls[url];
        //console.log(item);
        let re = new RegExp(item);
        let result = re.exec(currentTab.url);
        //console.log(result);
      
        // current tab is acceptable
        if(result){           
          flag = true;                         
          currentBookmark = true;
          updateIcon();            
        }

      }

      //the current tab is not acceptable
      if(flag == false){
        currentBookmark = false;
        updateIcon();
      }

    }
  }
 
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);  
}

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(updateActiveTab);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(updateActiveTab);

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

// update when the extension loads initially
updateActiveTab();


document.addEventListener("click", (e) => {

  function urlStatus(data){
    if(!session_token){
      document.getElementById('login-form').style.display = 'inline';
      console.log("You are not logged in");
    }
    /*if(currentBookmark){
      document.getElementById('popup-success').innerHTML = `<p>Our team will verify and add this product to your product watch list. Thank you.</p>`;
      
      
    }else{
      document.getElementById('popup-success').innerHTML = "FAILED... :(";
    }*/   
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
});

document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let username = document.forms["myForm"]["username"].value;
    let password = document.forms["myForm"]["password"].value;
    console.log(username);
    
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


    if(username && password){
      postData('http://127.0.0.1:5000/auth', {usr:username, pswd:password})
      .then(function(data) {
        console.log(data['1']);
      })
      .catch(error => console.error(error)); 
    }   

  });