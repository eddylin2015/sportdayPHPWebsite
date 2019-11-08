function myTrim(x){  return x.replace(/^\s+|\s+$/gm,'');}
$(document).ready(function(){
	$('#edit_tbl').click(function(event){
		var input_first=null;
		$('.M').each(function(i){
			inputtxt=editCell($(this));
			if(input_first==null) input_first=inputtxt;		
		});
	});
	GenOriginalData();
	$('#save_tbl').click(function(event){
		closeedit();
		var json={};
		var json_count=0;
		var result_set="";
		var error_msg="";
		$('.M').each(function(i){
			if(OriginalData[$(this).attr('id')]!=$(this).text()){
				json_count++;
				decode=$(this).text();
				$(this).text(decode);
				json[$(this).attr('id')]=myTrim($(this).text());
			}
		});
		if(json_count>0 && PostUrl != null)
		{
			$.post(PostUrl,
				{datajson:json,
				siid:$("#siid").text()
				})
				.done(function(data){
				alert("update data:"+data+error_msg);
				for(var key in json){
					OriginalData[key]=-1;
				}
			});	
		}else{alert("POST:\n"+JSON.stringify(json));}	
	});
	$('#lock_tbl').click(function(event){
			$.post(LockPostUrl,
				{siid:$("#siid").text()})
				.done(function(data){
				alert("lock:"+data);
			});	
	});
	$('#tab_r').click(function(event){ tab_dire=0;});
    $('#tab_d').click(function(event){ tab_dire=1;});
    if($('#tab_d').text()=="")
    var t = new SortableTable(document.getElementById('EDUTBL'), 100);
});