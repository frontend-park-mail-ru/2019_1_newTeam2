function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function tableTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data, header, keys) {pug_html = pug_html + "\u003Ctable class=\"table\"\u003E\u003Ctr class=\"res_h\"\u003E";
// iterate header
;(function(){
  var $$obj = header;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var key = $$obj[pug_index0];
pug_html = pug_html + "\u003Cth\u003E" + (pug_escape(null == (pug_interp = key) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var key = $$obj[pug_index0];
pug_html = pug_html + "\u003Cth\u003E" + (pug_escape(null == (pug_interp = key) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
    }
  }
}).call(this);

// iterate data
;(function(){
  var $$obj = data;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var line = $$obj[pug_index1];
pug_html = pug_html + "\u003Ctr class=\"line\"\u003E";
// iterate keys
;(function(){
  var $$obj = keys;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var key = $$obj[pug_index2];
pug_html = pug_html + "\u003Ctd class=\"cell\"\u003E" + (pug_escape(null == (pug_interp = (key in line) ? line[key] : '') ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var key = $$obj[pug_index2];
pug_html = pug_html + "\u003Ctd class=\"cell\"\u003E" + (pug_escape(null == (pug_interp = (key in line) ? line[key] : '') ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var line = $$obj[pug_index1];
pug_html = pug_html + "\u003Ctr class=\"line\"\u003E";
// iterate keys
;(function(){
  var $$obj = keys;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var key = $$obj[pug_index3];
pug_html = pug_html + "\u003Ctd class=\"cell\"\u003E" + (pug_escape(null == (pug_interp = (key in line) ? line[key] : '') ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var key = $$obj[pug_index3];
pug_html = pug_html + "\u003Ctd class=\"cell\"\u003E" + (pug_escape(null == (pug_interp = (key in line) ? line[key] : '') ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E";}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"header" in locals_for_with?locals_for_with.header:typeof header!=="undefined"?header:undefined,"keys" in locals_for_with?locals_for_with.keys:typeof keys!=="undefined"?keys:undefined));;return pug_html;}