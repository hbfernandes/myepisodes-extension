// ==UserScript==
// @name        MyEpisodes Download Link
// @include     http://www.myepisodes.com/epslist*
// @version     0.1
// @Author      hfernandes
// @grant       none
// ==/UserScript==


(function() {
  function Tracker(shortname, icon, searchurl, useNumbers) {
    this.shortname = shortname;
    this.icon = icon;
    this.searchurl = searchurl;
    this.useNumbers = useNumbers;
    
    this.getHTML = function (query, episode) {
      var tShortname = this.shortname;
      var tIcon = this.icon;
      var tSearchURL = this.searchurl;
      var tUseNumbers = this.useNumbers;
                  
      // Add episode numbers if enabled
      if(tUseNumbers){
        search = query + " " + episode;
      } else {
        search = query;
      }
      
      var html = "<a target=\"_blank\" href=\"" + tSearchURL;  
      html += escape(search);
      html += "\">";

      if (tIcon != "") {
        html += "<img width=\"14\" heigth=\"14\" border=\"0\" src=\"" + tIcon + "\" alt=\"" + tShortname + "\">";
      } else {
        html += tShortname;
      }
      html += "</a>";
      return html;
    }
    
  }
   
  function addDownloadPrivateShowList(downloadURL) {
    // iterate through series table
    var seriesTable = document.getElementById("myepisodes_views").getElementsByClassName("mylist")[0];
    
    // Create Download column
    var header = seriesTable.getElementsByClassName("header")[0];
    var newCol = document.createElement('th');
    newCol.setAttribute('title', "Download");
    newCol.innerHTML = "D";
    header.appendChild(newCol);
    
    // iterate through rows
    var trs = seriesTable.getElementsByTagName("tr");
    for (i = 0; i < trs.length; i++) {
      var tr = trs[i];
      if(tr.className == "header"){ continue; }

      // Get series title
      var showTitle = tr.getElementsByClassName("showname")[0].getElementsByTagName("a")[0].innerHTML;
      
      // Get episode number
      var episode = "S" + tr.getElementsByClassName("longnumber")[0].innerHTML.replace("x", "E");
      
      // Add download link to each episode
      var newCell = document.createElement("td");
      newCell.innerHTML = downloadURL.getHTML(showTitle, episode);
      tr.appendChild(newCell);
    }
  }
  
  // --------------- downloadURL --------------- 
  // FORMAT: Tracker(shortName, iconURL, searchURL, useNumbers)
  //     shortName - Alt display name for link
  //     iconURL - icon displayed for link created
  //     searchURL - URL that search string is appended to
  //     useNumbers - if true adds the episode number to the search URL
  //var downloadURL = new Tracker("EZTV", "http://eztv.ag/favicon.ico", "https://eztv.ag/search/", false);
  downloadURL = new Tracker("Kickass", "https://kastatic.com/images/favicon.ico", "https://kickass.to/usearch/?field=seeders&sorder=desc&q=", true);
  // --------------- END OF downloadURL --------------- 

  //if($("title").text().indexOf("SeriesWatch") > -1){
  //  addDownloadSeriesWatch(downloadURL);
  //} else if($("title").text().indexOf("Private Show List") > -1){
    addDownloadPrivateShowList(downloadURL);
  //}  
  
})();
