function fetchData() {
  const url = "https://www.cricbuzz.com/api/cricket-match/commentary/75437"; // Replace with your URL

  const headers = new Headers();
  headers.append("Accept", "application/json");

  const cacheControl = "no-cache";

  // Fetch JSON data from the URL
  fetch(url, {
    method: "GET",
    headers: headers,
    cache: cacheControl,
  })
    .then((response) => response.json())
    .then((json) => {
      const miniscore = json.miniscore;
      const matchScoreDetails = json.matchScoreDetails;

      const score = miniscore.batTeam.teamScore;
      const wickets = miniscore.batTeam.teamWkts;
      const overs = miniscore.overs;
      const stats = miniscore.status;

      console.log("\n---------\nStatus:", stats);
      console.log("\nScore:", score);
      console.log("Wickets:", wickets);
      console.log("Overs:", overs);

      try {
        const batsmanMap = new Map();
        const commentaryList = json.commentaryList;

        for (let i = 0; i < commentaryList.length; i++) {
          const batsman = commentaryList[i].batsmanStriker;
          const batId = batsman.batId;

          if (!batsmanMap.has(batId)) {
            batsmanMap.set(batId, batsman);

            const batName = batsman.batName;
            const batRuns = batsman.batRuns;
            const batBalls = batsman.batBalls;

            if (batName && batRuns && batBalls) {
              console.log("\nBatsman Name:", batName);
              console.log("Batsman Runs:", batRuns);
              console.log("Balls Played:", batBalls);
            }
          }
        }
      } catch (error) {
        console.log("May be Stumps - ", error);
      }

      const bowler = miniscore.bowlerStriker;
      const bowlName = bowler.bowlName;
      const o_summary = miniscore.recentOvsStats;

      if (bowlName && overs) {
        console.log("\nBowler Name:", bowlName);

        console.log("Overs Summary:", o_summary);
      }
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
}

// Function to refresh the page and fetch data every 15 seconds
function refreshPage() {
  fetchData();
  setTimeout(refreshPage, 15000); // Refresh every 15 seconds (10000 milliseconds)
}

// Initial data fetch and page refresh trigger
refreshPage();
