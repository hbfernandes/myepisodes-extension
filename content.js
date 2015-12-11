// --------------- Tracker --------------- 
// FORMAT: Tracker(shortName, iconURL, searchURL, useNumbers)
//     shortName - Alt display name for link
//     iconURL - icon displayed for link created
//     searchURL - URL that search string is appended to
//     useNumbers - if true adds the episode number to the search URL
//var tracker = new Tracker("EZTV", "http://eztv.ag/favicon.ico", "https://eztv.ag/search/", false);
var tracker = new Tracker("Kickass", "http://kastatic.com/images/favicon.ico", "https://kickass.to/usearch/?field=seeders&sorder=desc&q=", true);

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
   
function addDownloadColumn(tracker) {
	// iterate through series table
	var seriesTable = $("div#myepisodes_views table.mylist");

	// Create Download column
	seriesTable.find("tr.header").append("<th title=\"Download\">D</th>");

	// iterate through rows
	seriesTable.find("tr[class!=header]").each(function() {
		// only add to the ones already out
		if($(this).hasClass("past") || $(this).hasClass("today")){
			// Get series title
			var showTitle = $(this).find("td.showname a").text();

			// Get episode number
			var episode = "S" + $(this).find("td.longnumber").text().replace("x", "E");

			// Add download link to each episode
			$(this).append("<td align=\"center\">" + tracker.getHTML(showTitle, episode) + "</td>");		
		}
		else{
			$(this).append("<td align=\"center\">-</td>");			
		}
	});
}

// add the extra column when the data is loaded 
$('div#view').bind("DOMSubtreeModified",function(){
	if($('div#view table.mylist')){
		$('div#view').unbind("DOMSubtreeModified");
		addDownloadColumn(tracker);
	}
});
