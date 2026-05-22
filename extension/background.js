let currentTab = "";
let startTime = 0;

chrome.tabs.onActivated.addListener(async () => {

  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  const newTab = tabs[0].url;

  console.log("New Active Tab:", newTab);

  const endTime = Date.now();

  // Calculate previous tab time
  if (currentTab !== "") {

    const timeSpent = Math.floor((endTime - startTime) / 1000);

    console.log("Previous Tab:", currentTab);
    console.log("Time Spent:", timeSpent);

    // Save locally
    chrome.storage.local.get(["trackingData"], (result) => {

      let trackingData = result.trackingData || [];

      trackingData.push({
        website: currentTab,
        duration: timeSpent
      });

      chrome.storage.local.set({
        trackingData: trackingData
      });

      console.log("Saved Locally");

    });

    // Send to backend
    fetch("http://localhost:5000/track", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        website: currentTab,
        duration: timeSpent,
        date: new Date().toLocaleDateString()
      })

    })
    .then(res => res.json())
    .then(data => console.log("Saved to MongoDB:", data))
    .catch(err => console.log(err));

  }

  // Update current tab
  currentTab = newTab;

  startTime = Date.now();

});