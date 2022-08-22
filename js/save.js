function saveas(){  
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById("content").value));
	element.setAttribute('download', 'readme.md');
	 
	element.click();
	
}
function saveAsHtml(){
	var element = document.createElement('a');
	var he = '<html><head><style>pre{background-color: #BDBDBD;font-size: 20px;}tr{font-size: 30;}td{font-size: 30;}.main_left{'+
	'width: 150px;height: 100%;float:left;background:#c0c0c0;}</style></head><body>';
	var fo = '</body></html>'
	element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(he+document.getElementById("div_if").innerHTML+fo));
	element.setAttribute('download', 'markdown.html');
	 
	element.click();
}
function contentS(){
	document.getElementById("content").scrollTop=1;
	document.getElementById("div_if").scrollTop=1;
}