////////PUBLIC
var curr_td = null;
var PastFrm = null;
var CSVFrm = null;
var OriginalData = null;
var PostUrl = null;
var _Field_Defs = null;
var tab_dire = 0;


////////Program Start
function BindingZeroClipboard(id, tablename) {
	ZeroClipboard.setMoviePath('ZeroClipboard.swf');
	var clip = new ZeroClipboard.Client();
	clip.addEventListener('mousedown', function () {
		closeedit();
		var copytxt = "";
		$('#' + tablename + ' tr').each(function () {
			$(this).find('td').each(function () {
				var cellinnerHTML = $(this).text(); copytxt = copytxt + cellinnerHTML + '\t';
			})
			copytxt = copytxt + "\n";
		})
		//copytxt=document.getElementById('tableContent').innerHTML;
		clip.setText(copytxt);
	});
	clip.addEventListener('complete', function (client, text) {
		alert('copied: ');
	});
	clip.glue(id);
}
function bind_txtinput_paste($txtinput, cell) {
	$txtinput.bind('paste', function (e) {
		var txt = e.originalEvent.clipboardData.getData('Text');
		var data_arr = new Array();
		var rowcnt = 0;
		for (i = 0; i < txt.length; i++) {
			if (txt[i] == '\n') {
				rowcnt++;
			} else {
				if (data_arr[rowcnt] == null) data_arr[rowcnt] = "";
				data_arr[rowcnt] += txt[i];
			}
		}
		var colcnt = data_arr[0].split('\t').length;
		var f_data_arr = new Array();
		for (i = 0; i < rowcnt; i++) {
			f_data_arr[i] = new Array();
		}
		for (j = 0; j < rowcnt; j++) {
			var temp_ar = data_arr[j].split('\t');
			if (temp_ar.length >= colcnt) {
				for (k = 0; k < colcnt; k++)
					f_data_arr[j][k] = temp_ar[k];
			}
		}
		//return f_data_arr;
		if (rowcnt > 1 || colcnt > 1) {
			if (confirm("有 " + rowcnt + "x" + colcnt + " 格資料,是否粘貼相應" + rowcnt + "x" + colcnt + "格上?")) {
				var c_cell = cell;
				var c_cell_col_id = 0;
				var f_cell = c_cell.parent().children('td:first');
				for (i = 0; i < 20; i++) {
					c_cell_col_id++;
					if (c_cell.attr('id') == f_cell.attr('id')) {
						break;
					}
					f_cell = f_cell.next();
				}

				for (rid = 0; rid < rowcnt; rid++) {
					for (cid = 0; cid < colcnt; cid++) {
						if (c_cell.has(":input").length > 0) {
							input = c_cell.children();
							strv = input.val(f_data_arr[rid][cid]);

						} else {
							c_cell.text(f_data_arr[rid][cid]);
						}
						if (cid < colcnt - 1)
							c_cell = c_cell.next();
					}
					c_cell = c_cell.parent().next('tr').children('td:first');
					for (i = 1; i < c_cell_col_id; i++) { c_cell = c_cell.next(); }
				}
				return false;
			} else { return true; }

		}
	});
}
function editCell(cell) {
	//$txt=$('<input type=text>');
	//$txt.width(cell.width()-3);
	if (cell.has(":input").length == 0) {
		$txt = null;
		if (cell.attr('imemode') == 'number' || cell.attr('imemode') == 'tel' || cell.attr('imemode') == 'url') {
			$txt = $('<input style="text-align: right" type=' + cell.attr('imemode') + ' maxlength=9 ></input>');
		}
		else {
			$txt = $('<textarea></textarea>');
		}
		$txt.width(cell.width() + 1);
		$txt.height(cell.height() - 0);
		//bind_txtinput_paste($txt,cell);  //cell past 2014/06/03	
		var val = cell.text();
		if (cell.attr('id').substring(0, 2) == 'rc') {
			val = val.replace(/'/g, "*");
		}else if (cell.attr('id').substring(0, 2) == 'B3'||cell.attr('id').substring(0, 2) == 'B5') {
			val = val.replace(/'/g, "*");
		}else if (imemodeforsport == 'RCFIE' && cell.attr('id').substring(0, 1) == 'h') {
			val = val.replace('.', "*");
		} 
		else if (imemodeforsport == 'RCFJH' && cell.attr('id').substring(0, 2) == 'HJ') {
			val = val.replace('.', "*");
		}

		cell.text("");
		$txt.val(val);
		cell.append($txt);
		return $txt;
	}

}
function closeedit() {
	$('.M').each(function (i) {
		if ($(this).has(":input").length == 0) {
		} else {
			input = $(this).children();
			strv = input.val();
			if ($(this).attr('id').substring(0, 2) == 'rc') { strv = strv.replace(/[*]/g, "'"); }
			else if (imemodeforsport == 'RCFIE' && ($(this).attr('id').substring(0, 1) == 'h' || $(this).attr('id').substring(0, 1) == 'B')) 
			{
				if(strv=='*') {strv="X"}else{ strv = strv.replace('*', '.');}
			} else if (imemodeforsport == 'RCFJH' && $(this).attr('id').substring(0, 1) == 'h') {
				strv = strv.toUpperCase();
			}else if (imemodeforsport == 'RCFJH' && $(this).attr('id').substring(0, 2) == 'HJ') {
				strv = strv.replace('*', '.');
			}
			if ($(this).attr('id').substring(0, 4) == 'note') { strv = strv.toUpperCase(); }
			$(this).text(strv);
			input.remove();
		}
	});
}

function BindingFieldDefsIntegerFields(fielddef_obj) {
	_Field_Defs = fielddef_obj;
}

function GenOriginalData() {
	if (OriginalData == null) {
		closeedit();
		OriginalData = {};
		$('.M').each(function (i) {
			OriginalData[$(this).attr('id')] = $(this).text();
		});
	}
}
function SplitPastFrmText(txt) {
	var data_arr = new Array();
	var fieldtxt = "";
	var rowcnt = 0;
	for (i = 0; i < txt.length; i++) {
		if (txt[i] == '\n') {
			rowcnt++;
		} else {
			if (data_arr[rowcnt] == null) data_arr[rowcnt] = "";

			data_arr[rowcnt] += txt[i];
		}
	}

	var colcnt = data_arr[0].split('\t').length;
	var f_data_arr = new Array();
	for (i = 0; i < colcnt; i++) {
		f_data_arr[i] = new Array();
	}
	for (j = 0; j < rowcnt; j++) {
		var temp_ar = data_arr[j].split('\t');
		if (temp_ar.length >= colcnt) {
			for (k = 0; k < colcnt; k++)
				f_data_arr[k][j] = temp_ar[k];
		}
	}
	return f_data_arr;

}
function ArrayPast2Table(tablename, fieldname, fill_data) {
	var table = document.getElementById(tablename);
	var rowLength = table.rows.length;
	var find_column_id = -1;
	var procmsg = '';
	loopcnt = rowLength;
	if (fill_data.length < loopcnt) loopcnt = fill_data.length;
	for (var i = 0; i < loopcnt; i += 1) {
		var row = table.rows[i];
		var cellLength = row.cells.length;
		if (i == 0) {
			for (var y = 1; y < cellLength; y++) {
				var cell = row.cells[y];
				var cellinnerHTML = cell.innerHTML;
				try { cellinnerHTML = cell.innerHTML.trim(); } catch (e) { }
				if (cellinnerHTML == fieldname) {
					find_column_id = y;
					procmsg += "find field in table:" + fieldname + "at" + find_column_id;
				}
			}
		} else {
			for (var y = 1; y < cellLength; y++) {
				var cell = row.cells[y];
				if (y == find_column_id) {
					cell.innerHTML = fill_data[i];
					procmsg += "\n" + i + ":" + y + ":" + cell.innerHTML + "-" + fill_data[i];
				}
			}
		}

	}
	return procmsg;
}

function BindingPastFrm(frm, txt, table) {
	PastFrm = frm;
	$("#" + frm).dialog(
		{
			autoOpen: false,
			minWidth: 500,
			title: 'Past:',
			buttons: {
				"past": function () {
					closeedit();
					var fill_data = SplitPastFrmText($("#" + txt).val());
					for (i = 0; i < fill_data.length; i++) {
						var fieldname = "";
						if (fill_data[i].length > 0) {
							fieldname = fill_data[i][0];
						}
						var conf = confirm("粘貼欄位:" + fieldname + "?");
						if (conf == true) {
							alert(ArrayPast2Table(table, fieldname, fill_data[i]));
						}
					}
					$(this).dialog("close");
				}
			},
			open: function () {
				$('#' + txt).val("");
			}
		});
}
function BindingCSVFrm(frm, linkid, tabletxt, filename) {
	CSVFrm = frm;
	$('#' + frm).dialog(
		{
			autoOpen: false,
			minWidth: 500,
			title: 'CSV:',
			open: function () {
				closeedit();
				exportData(tabletxt, filename, 'CSVFrm_Link');
			}
		});
}
function BindingFunctions(editbtn, savebtn, pastbtn, exportbtn, readmodbtn) {
	$('#' + editbtn).click(function (event) {
		var input_first = null;
		$('.M').each(function (i) {
			if ($(this).has(":input").length == 0) {
				inputtxt = editCell($(this));
				if (input_first == null) input_first = inputtxt;
			}
		});
		input_first.focus();
	});
	$('#' + savebtn).click(function (event) {
		closeedit();
		var json = {};
		var result_set = "";
		var error_msg = "";
		$('.M').each(function (i) {
			if (OriginalData[$(this).attr('id')] != $(this).text()) {
				if (_Field_Defs == null) {
					json[$(this).attr('id')] = $(this).text().trim();
				} else {
					fH = $(this).attr('id').split('_')[0];
					if (_Field_Defs[fH] == 'INT' && !$(this).text().match(/^[0-9]+$/)) {
						error_msg = '錯誤:輸入整數!\n' + $(this).attr('id') + '\n' + $(this).text();
					} else {
						json[$(this).attr('id')] = $(this).text().trim();
					}
				}
			}
		});

		if (PostUrl != null) {
			$.post(PostUrl, { datajson: JSON.stringify(json), keycode: '125678985432' })
				.done(function (data) {
					alert("Update Data : " + data + error_msg);
					for (var key in json) {
						OriginalData[key] = "-1";

					}
				});
		} else {
			alert("constructing ... POST:\n" + JSON.stringify(json));
		}
	});
	$('#' + pastbtn).click(function () { $('#' + PastFrm).dialog('open'); });
	$('#' + exportbtn).click(function () { $('#' + CSVFrm).dialog('open'); });
	$('#' + readmodbtn).click(function () { closeedit(); });

}
var head_editMod_status = new Object();
function BindingHead_EditMode(head_arr) {
	for (i = 0; i < head_arr.length; i++) {
		head_editMod_status[head_arr[i]] = false;
		$("#" + head_arr[i]).click(function (event) {
			fix = $(this).attr('id').split('_')[0];
			if (head_editMod_status[$(this).attr('id')]) {
				var input_first = null;
				$('.M').each(function (i) {
					if ($(this).attr('id').substr(0, fix.length) == fix && $(this).has(":input").length > 0) {
						input = $(this).children();
						strv = input.val();
						$(this).text(strv);
						input.remove();
					}
				});
				input_first.focus();
			} else {
				var input_first = null;
				$('.M').each(function (i) {
					if ($(this).attr('id').substr(0, fix.length) == fix && $(this).has(":input").length == 0) {
						if (input_first == null) { input_first = editCell($(this)); } else { editCell($(this)); }
					}
				});
				input_first.focus();
			}
			head_editMod_status[$(this).attr('id')] = !head_editMod_status[$(this).attr('id')];
		});
	}
}
$(document).ready(function () {
	//	$('td.M').click(function(event){
	//		editCell($(this)).focus();
	//	});	
	function EndModify() {
		$('.M').each(function (i) {
			if ($(this).has(":input").length == 0) {
			} else {
				input = $(this).children();
				strv = input.val();
				$(this).text(strv);
				input.remove();
			}
		});
	}

	$("td.M").keydown(function (e) {
		if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13) {
			var cell_id = $(this).attr('id');
			var cell_fieldname = cell_id.split('_')[0];
			var rowid = -1;
			var next_rowid = -1;
			var count = 0;
			var cells = new Array();
			$('.M').each(function (i) {
				if ($(this).has(":input").length != 0) {
					cells[count] = $(this);
					if (next_rowid == -1 && rowid > -1 && $(this).attr('id').split('_')[0] == cell_fieldname) next_rowid = count;
					if ($(this).attr('id') == cell_id) rowid = count;

					count++;
				}
			});

			switch (e.keyCode) {
				case 38: //this is up!
					rowid--;
					e.preventDefault();
					if (rowid < count && rowid >= 0) { cells[rowid].children().focus(); }
					break;
				case 40: //this is down! 
				case 13:
					if (tab_dire > 0) {
						rowid = next_rowid;
					} else { rowid++; }
					e.preventDefault();
					if (rowid < count && rowid >= 0) { cells[rowid].children().focus(); }
					break;
			}
		}

	});


});
