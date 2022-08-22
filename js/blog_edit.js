function keepLastIndex(obj) {
	if (window.getSelection) {//ie11 10 9 ff safari
		obj.focus(); //解决ff不获取焦点无法定位问题
		var range = window.getSelection();//创建range
		range.selectAllChildren(obj);//range 选择obj下所有子内容
		range.collapseToEnd();//光标移至最后
	}
	else if (document.selection) {//ie10 9 8 7 6 5
		var range = document.selection.createRange();//创建选择对象
		//var range = document.body.createTextRange();
		range.moveToElementText(obj);//range定位到obj
		range.collapse(false);//光标移至最后
		range.select();
	}
}
 function createList(list, j, len){
	var st = new stack();
	// var t = '';
	var res = '';
	var ceng = 0;
	var k = j;
	for(k;k<len;k++){
		console.log(list[k]);
		console.log(ceng);
		list[k]=list[k].replace('&nbsp',' ');
		if(ceng==0){
			res = res + '<ul><li>'+list[k];
			st.push('</ul>');
			st.push('</li>');
			ceng++;
		}
		else if(ceng==1&&list[k].indexOf('- ')==0){
			res = res + st.peek();
			st.pop();
			res = res +'<li>'+list[k];
			st.push('</li>');
			
		}
		else if(ceng==1&&list[k+1].indexOf('- ')==-1){
			res = res + st.peek();
			st.pop();
			res = res + st.peek();
			st.pop();
			res = res+'<li>'+list[k]+'</li>';
			ceng--;
		}
		else if(ceng==1&&list[k].indexOf(' - ')==0){
			res = res + '<ul><li>'+list[k];
			st.push('</ul>');
			st.push('</li>');
			ceng++;
			if(list[k+1].indexOf(' - ')!=0){
				res = res + st.peek();
				st.pop();
				res = res + st.peek();
				st.pop();
				ceng--;
				continue;
			}
		}else if(ceng==2&&list[k].indexOf(' - ')==0){
			res = res + st.peek();
			st.pop();
			res = res +'<li>'+list[k];
			st.push('</li>');
		}else if(ceng==2&&list[k+1].indexOf(' - ')==-1){
			res = res + st.peek();
			st.pop();
			res = res + st.peek();
			st.pop();
			res = res+'<li>'+list[k]+'</li>';
			ceng=1;
		}
		
	}
	return res;
 }
 
 
function searchSubStr(str,  subStr){
	var positions = [];
    var pos = str.indexOf(subStr);

    while(pos>-1){

        positions.push(pos);

        pos = str.indexOf(subStr,  pos+1);

    }
	return positions.length;
}

Array.prototype.remove = function(val) {
var index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};
function get(){
	// var h5head = '<html><head><meta charset="utf-8"><title>MarkDownReader</title><style>' +
	//          'pre{background-color: #BDBDBD;font-size: 20;' +
	//          '}tr{font-size: 30;}td{font-size: 30;}.main_left{width: 150px;height: 100%;float:left;background:#c0c0c0;}'+
	// 		 '</style></head><body><div class="main_left">';
	var h5head = '<div>' ;
	var h5head2 = '<div>';
	
	// var h5foot = '</div></body></html>';
	var h5foot = '</div>';
	var h2s = new Array();
	var iscode = 0;
	var isTable = 0;
	var html = '';
	// var lines = document.getElementById("content").value.split("\n");
	var lines = document.getElementById('content').innerText.replace('&nbsp',' ').split('\n');
	var s;
	var isList = 0;
	
	
	var k3=0;
	var tlist = [];
	
	
	for( var i = 0;i<lines.length;i++){
		var a = lines[i];
	
		if(a.indexOf('- ')==0){
			var len=i;
			while(lines[len].indexOf('-')!=-1){
				len++;
			}
			s = createList(lines,i,len);
			i=len;
			html = html+'<center>'+s+'</center>';
			continue;
		}
		
		
		// a = a.trim();
		
		
		if(a.indexOf("###### ")==0){
			s = '<h6>' + a.split('###### ')[1] + '</h6>';
		}else if(a.indexOf("##### ")==0){
			s = '<h5>' + a.split('##### ')[1] + '</h5>';
		}else if(a.indexOf("#### ")==0){
			s = '<h4>' + a.split('#### ')[1] + '</h4>';
		}else if(a.indexOf("### ")==0){
			s = '<h3>' + a.split('### ')[1] + '</h3>';
		}else if(a.indexOf("## ")==0){
			var h2 = a.split('## ')[1];
			s = '<h2 id="' + h2 + '">'+ h2 +'</h2>';
			h2s.push(h2);
		}else if(a.indexOf("# ")==0){
			s = '<h1>' + a.split('# ')[1] + '</h1>';
		}else if(a.indexOf("|")!=-1){
			
			if(isTable==0){
				html = html + "<div align='center' style='table-layout: fixed;display: flex;'><table style='flex-grow: 1;'><tbody bgcolor='#F9C5D5'>";
				s = '<tr>';
				isTable = 1;
			}else{
				s = '<tr bgcolor="#FEE3EC">';
			}
			if(lines[i+1].indexOf(":-")!=-1){
				len = searchSubStr(lines[i+1],': |');
				console.log(len);
			}
			if(a.indexOf('| :-')!=-1){continue;}
			// a = a.replace(/\s*/g,"");
			var al = a.split("|");
			// al.remove("");
			var ar = '<td>';
			// for(var k=1;k<al.length;k++){
			// 	ar = ar + al[k] + '</td>' + '<td>';
			// }
			console.log(al);
			for(var k=1;k<=len;k++){
				
				ar = ar + al[k] + '</td>' + '<td>';
				
			}
			ar = ar + '</td>';
			// console.log(ar);
			// ar = ar.substring(0, ar.lastIndexOf("<td></td>"));
			ar = ar.substring(0, ar.lastIndexOf("<td></td>"));
			console.log(ar);
			s = s + ar + '</tr>';
			if(isTable==1&&lines[i+1].indexOf("|")==-1){
				s = s + '</tbody></table></div>';
				isTable = 0;
				len = 0;
			}
		}else if(a.indexOf("```")!=-1){
			a = a.replace('```', '');
			if (iscode != 2){
				s = '<div style="overflow-x:auto;background-color:#F8F8F8;font: bold;"><code><pre>' + a+'\n';
				iscode = 2;
			}else{
				s = a + '</pre></code></div>';
				iscode = 0;
			}
			
		}else if(a.indexOf("![")==0&&a.indexOf("](")!=-1){
			var t = a.split("](")[1];
			t = t.substring(0,t.lastIndexOf(")"));
			var filename = t.substring(t.lastIndexOf("\\")+1,t.length);
			s = '<p align="center">'+filename+'</p><p align="center"><img src="'+t+'"</img></p>'
		}else{
			a = a.replace('#####', '');
			if (iscode == 2){
				s = a+'\n';
			}
			else{
				s = '<p>' + a + '</p>';
			}
		}
		html = html + s;
	}
	
	
	html = h5head+h5head2+html+h5foot;
	
	txt = html;
	document.getElementById("div_if").innerHTML = html;
	
}