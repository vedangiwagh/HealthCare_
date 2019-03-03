"use strict";StackExchange.tagEditor=function(e,t,n,i){function r(){U=!0}function o(){if("undefined"==typeof mt){for(var e=StackExchange.tagEditor.requiredTags,t=[],n=0;n<e.length;n++)t.push(f(e[n]).replace(/[.+]/g,"\\$&"));mt=new RegExp("^(?:"+t.join("|")+")$")}return mt}function a(){if(!i.ignoreRequired){var e=StackExchange.tagEditor.requiredTags;if(e&&/^ ?$/.test(ut.val())){var t=o();0===lt.add(dt).children().filter(function(){return t.test($(this).text())}).length&&O(StackExchange.tagEditor.requiredTags)}}}function s(e,t){var n=z(e);if(i.tagMenus&&n.data("tag-menu-tagname",e),!t){if(n.hasClass("s-tag")){var r="<svg style='pointer-events:none;' class='svg-icon iconClearSm' width='12' height='12' viewBox='0 0 14 14'><path d='M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z'></path></svg>",o=$("<a>",{"class":"js-delete-tag s-tag--dismiss","title":i.tooltipDeleteTag||"Remove tag"});o.append($(r)),n.append(o)}else n.append($("<span>",{"class":"js-delete-tag delete-tag","title":i.tooltipDeleteTag||"Remove tag"}));X.trigger("tagSpanCreated",[n])}return i.tagSpanCreated&&i.tagSpanCreated(n),n}function c(e){var t=$([]),n=$([]);switch(e){case $t.all:t=lt.find(".rendered-element"),n=dt.find(".rendered-element");break;case $t.left:t=lt.find(".rendered-element:last");break;case $t.right:n=dt.find(".rendered-element:first");break;case $t.all_left:t=lt.find(".rendered-element");break;case $t.all_right:n=dt.find(".rendered-element")}return{"pre":t,"post":n}}function l(e){e=e||$t.all;var t=c(e),n=t.pre.map(function(e,t){return $(t).text()}).get(),i=n.join(" ");i.length&&(i+=" ");var r=t.post.map(function(e,t){return $(t).text()}).get(),o=r.join(" ");o.length&&ut.val().length&&(o=" "+o);var a=ut.val();return n=n.concat(r),{"text":i+ut.val()+o,"lengthBeforeInput":i.length,"val":a,"tags":n}}function u(t){t=t||l(),setTimeout(function(){e.trigger("tageditor:renderedchange",[t.tags,t.val])}),w()}function d(){var e=ut.val();return(""===e||" "===e)&&0===lt.add(dt).children().filter(function(){return!/^\s*$/.test($(this).text())}).length}function f(e){return i.getTagNameFromData?i.getTagNameFromData(e):e.Name}function h(e){e=e||$t.all;var t=ut.caret(),n=ut[0].selectionDirection,i=c(e);if(i.pre.add(i.post).length){var r=l(e);ut.val(r.text),i.pre.remove(),i.post.remove(),ut.caret(t.start+r.lengthBeforeInput,t.end+r.lengthBeforeInput),ot&&(ut[0].selectionDirection=n),D(),u()}}function p(e){if(i.operators&&i.operators.test(e))return $("<span class='rendered-element'/>").text(e);var t=s(e).addClass("rendered-element");return g(e)||t.addClass("invalid-tag temp-tag__danger").attr("title",i.tooltipInvalidTag||"invalid tag"),t}function g(e){return i.invalid&&i.invalid[e]?!1:i.isTagValid&&!i.isTagValid(e)?!1:!0}function m(t){if(!vt){var n;if(n=t?{"start":ut.val().length,"end":ut.val().length}:ut.caret(),-1==n.start&&(n.start=n.end=0),!ot&&n.start!==n.end)return h(),w(),void 0;var r=ut.val(),o=r.substr(0,n.start),s=r.substr(n.end),c=ut[0].selectionDirection,f=i.customCleanUpSplitRegex||/[,;\s]+/,g=(o+"!").split(f);g[g.length-1]="!"===g[g.length-1]?"":g[g.length-1].slice(0,-1);var m=s.split(f),v=g.pop(),b=v.length;v+=r.substring(n.start,n.end),v+=m.shift(),g=G(g.join(" ")),m=G(m.join(" "));var y,k=!!g.length||!!m.length;for(y=0;y<g.length;y++)p(g[y]).appendTo(lt);for(y=0;y<m.length;y++)p(m[y]).appendTo(dt);v!==ut.val()&&ut.val(v);var x=X.find(".rendered-element"),S=K(x.map(function(e,t){return $(t).text()}));y=0,x.filter(function(){return!S[y++]}).remove();var E=l(),C=$.trim(E.text);C!=e.val()&&(e.val(C).trigger("change"),StackExchange.MarkdownEditor&&!i.ignoreStyleCode&&styleCode.updateLangdivDelayed.trigger(C.split(/ /g))),k&&u(E),U&&(ut.caret(b,b+n.end-n.start),ot&&(ut[0].selectionDirection=c),_(),a()),w(),d()?ut.attr("placeholder",W):ut.attr("placeholder","")}}function v(e,t,n,i){var r,o;if("string"==typeof e)o=e;else{if(!e.length)return;r=e,o=r.text()}for(var a=G(ut.val()),s=0;s<a.length;s++)p(a[s]).appendTo(lt);if(ut.val(o),r){var c=$($.unique(r.prevAll(".rendered-element").get()));r.nextAll(".rendered-element").prependTo(dt),c.appendTo(lt),r.remove()}else dt.find(".rendered-element").appendTo(lt);(U||!n)&&ut.focus(),t&&ut.caret(0,0),i||u()}function b(e){var t=e.val(),n="c_"+t;if(n in Et)return Et[n];var i=$("<span />").css({"font-family":e.css("font-family"),"font-size":e.css("font-size"),"display":"inline-block"});i.text(e.val()),i.insertAfter(e);var r=i.innerWidth();return i.remove(),Et[n]=r,r}function y(e){i.multiLine||e!==Ct&&(lt.add(ut).add(dt).css({"position":"relative","left":e}),Ct=e)}function w(){rt&&(J=X.innerWidth());var e=b(ut)+19,t=lt.outerWidth();if(i.multiLine||dt.children().length||(e=Math.max(e,J-t-8)),ut.css("width",e),i.multiLine){var n=ut.position().top,r=n;if(r>0&&ct>r+st)return;if(n+X.scrollTop()+st<ct)return X.scrollTop(0),void 0;X.scrollTop(n-(ct-st)/2+X.scrollTop())}else{if(t+Ct>0&&J>t+Ct+e)return;if(J>t+e)return y(0),void 0;y(-t+(J-e)/2)}}function k(e,t){var n;n=e>0?dt.find("> *"):lt.find("> *");for(var i,r,o=ut.position(),a=ut.val().length,s=a>0?ut.caret().start/a:.5,c=o.left+ut.width()*s,l=0;l<n.length;l++){var u=n.eq(e>0?l:n.length-l-1),d=u.position();if("undefined"!=typeof r){if(d.top!==r)break}else{var f=Math.abs(d.top-o.top);if(!(f>st/2))continue;r=d.top}var p=d.left+u.width()/2;if(0>e&&c>p||e>0&&p>c){i=i||u;break}i=u}if(i){if(t){for(;i.parent().length;)h(e>0?$t.right:$t.left);ut.caret(0,ut.val().length)}else v(i);return!0}return!1}function x(){kt=!0,setTimeout(function(){kt=!1},0)}function S(){var e=G(ut.val())[0];if(e){var t=$("<span data-tag-name='"+e+"'/>");L(t)}}function E(e){if(!ot&&e.shiftKey&&Tt[e.which]||e.ctrlKey&&65===e.which)return h(),!0;var t,n,r=ut.caret(),o=ut[0].selectionDirection,a="forward"===o?r.end:r.start,s=a===ut.val().length,c=0===a;switch(e.which){case 37:return c?(t=lt.find(".rendered-element:last"),t.length?(e.shiftKey?h($t.left):v(t),e.shiftKey):!0):!0;case 39:return s?(n=dt.find(".rendered-element:first"),n.length?(e.shiftKey?h($t.right):v(n,!0),e.shiftKey):!0):!0;case 8:return c?(t=lt.find(".rendered-element:last"),t.length?(ut.val(t.text()+ut.val()),ut.caret(t.text().length,t.text().length),t.remove(),u(),!1):!0):!0;case 46:return s?(n=dt.find(".rendered-element:first"),n.length?(ut.val(ut.val()+n.text()),ut.caret(a,a),n.remove(),u(),!1):!0):!0;case 38:if(i.multiLine&&k(-1,e.shiftKey))return!1;case 36:return t=lt.find(".rendered-element:first"),t.length?(e.shiftKey?h($t.all_left):v(t,!0),e.shiftKey):!0;case 40:var l=Q.children("div:first");if(l.length)return x(),l.focus(),!1;if(i.multiLine&&k(1,e.shiftKey))return!1;case 35:return n=dt.find(".rendered-element:last"),n.length?(e.shiftKey?h($t.all_right):v(n),e.shiftKey):!0;case 9:x(),i.renderErrorTagIfNoResults&&!T()&&S();break;case 13:if(T())return!1;break;case 32:if(i.spaceSelectsTopSuggestion===!1)return!1;if(i.spaceSelectsTopSuggestion&&T())return L(Q.children("div:first")),!1}return!0}function C(e){return 27===e.which&&Q.length>0?(D(),e.preventDefault(!0),e.stopPropagation(),!1):!0}function T(){return!!Q.length&&!Q.hasClass("no-results")}function _(){var e=G(ut.val())[0];return e&&(i.searchTermModifier&&(e=i.searchTermModifier(e)),i.allowUpperCaseTagNames&&(e=e.toLocaleLowerCase())),xt!==e?(xt=e,e&&e.length?(I(e,function(t){e===xt&&U&&O(t,e)}),void 0):(bt()||D(),void 0)):void 0}function I(e,t){var n=A(e);_t[n]?t(_t[n]):It.trigger(e,t)}function j(){return i.tagApiUrl||"/filter/tags"}function A(e){return j()+"|"+e}function O(e,t){Q.remove(),vt=!1;var n=ct;i.multiLine&&(n=X.height());var r=e.length;if(0===r)return Q=$("<div class='tag-suggestions no-results box-border fs-cation fc-light c-default'>No results found</div>").css({"position":"absolute","left":X.position().left,"top":X.position().top+n+1,"width":Z}).insertAfter(X),void 0;Q=$("<div class='tag-suggestions js-tag-suggestions box-border' />").css({"position":"absolute","left":X.position().left,"top":X.position().top+n+1,"width":Z}).insertAfter(X);var o={};X.find(".rendered-element").each(function(){o[$(this).text()]=!0});for(var a=i.suggestionTagBoxRenderer||M,s=0;s<e.length;s++)if(o[f(e[s])]!==!0){var c=a(e[s],t).appendTo(Q).attr("tabindex",ft||0);P(c),s%q!==0||tt||c.css("clear","both")}Q.on({"keydown":N,"keyup":B,"click":function(e){$(e.target).is("a")||L($(this))},"focus":function(){kt&&1===r?L($(this)):vt=!0},"blur":function(){vt=!1}},"div")}function M(e,t){var n=$("<div />").css("width",tt?"auto":et).data("tag-name",e.SynonymOf||f(e));t&&(t=t.replace(/-/g,"").replace(/\*+/g,"	").replace(/([^\t])(?=[^\t])/g,"$1-*").replace(/\+/g,"\\+").replace(/\./g,"\\.").replace(/\t/g,".*"));var i=s(f(e),!0),r=i.html();if(t&&(r=r.replace(new RegExp("("+t+")"),"<span class='match'>$1</span>")),tt&&i.addClass("m0"),n.append(i.html(r)),e.Count&&!tt&&n.append($("<span class='item-multiplier' />").html("&times;&nbsp;"+e.Count)),V&&!tt){var o="";if(e.Excerpt&&(o=e.Excerpt),o.length&&n.append($("<p />").text(o)),e.Synonyms&&e.Synonyms.length)for(var a=$("<p >also:</p>").appendTo(n),c=e.Synonyms.split(/\|/),l=0;l<c.length;l++)o=c[l],t&&(o=o.replace(new RegExp("("+t+")"),"<span class='match'>$1</span>")),l>0&&(o=", "+o),a.append("<span>"+o+"</span>")}if(H&&!tt){var u=e.InfoUrl;u||(u=(e.IsDiverged?StackExchange.options.site.routePrefix:"")+"/tags/"+encodeURIComponent(e.SynonymOf||f(e))+"/info"),n.append("<p class='more-info'><a href='"+u+"' target='_blank'>learn more</a></p>")}return n}function P(e){var t=e.find("p.more-info");"undefined"==typeof St&&(St=et-5-t.outerWidth());var n=e.find(".rendered-element:first").outerWidth()+e.find(".item-multiplier").outerWidth();n>St&&t.find("a").text("info")}function L(e){ut.val(e.data("tag-name")),D(),v(""),m()}function R(e){StackExchange.options.enableLogging&&(console.log("tag editor new: "+e),"string"!=typeof e&&console.log(e))}function D(){Q.remove(),Q=$(),vt=!1,It.cancel()}function N(e){var t;switch(e.which){case 39:case 40:return $(this).next("div").focus(),!1;case 37:return $(this).prev("div").focus(),!1;case 38:return t=$(this).prev("div"),t.length?t.focus():ut.focus(),!1;case 13:return L($(this)),!1;case 32:return i.spaceSelectsTopSuggestion&&L($(this)),!1}}function B(e){return 27===e.which?(D(),ut.focus(),e.stopPropagation(),!1):!0}var U;if("undefined"==typeof n)try{U=e.is(":focus")}catch(F){U=!1}else U=n;if(e.bind("focus",r),!e.is(":visible"))return t=t||0,3>t?(setTimeout(function(){e.unbind("focus",r),StackExchange.tagEditor(e,t+1,U,i)},300),void 0):(e.unbind("focus",r),$("body.review-task-page").length||StackExchange.debug.log("tag box is invisible, couldn't start tag editor"),void 0);i||(i={});var q=i.columns||3,V="undefined"==typeof i.excerpts||i.excerpts,H="undefined"==typeof i.learnMore||i.learnMore,W=e.attr("placeholder")||"",z=i.renderTag||function(e){return window.tagRenderer(e,null,"span",i.useStacksClasses)},K=i.customFilterTags||function(e){var t={};return e.map(function(e){return/^\s*$/.test(e)?!1:t[e]===!0?!1:(i.operators&&i.operators.test(e)||(t[e]=!0),!0)})},G=i.customSafeTags||function(e){var t=StackExchange.helpers.sanitizeAndSplitTags(e,!1,!!i.operators,i.allowUpperCaseTagNames)||[];return e&&$.trim(e)&&R('safeTags("{0}") => {1}'.formatUnicorn(e,t.toString())),t},Q=$();e.unbind("focus",r);var J=e.innerWidth(),X=$("<div class='tag-editor' />").insertAfter(e);i.extraTagEditorCssClass&&X.addClass(i.extraTagEditorCssClass),["padding-right","padding-left","box-sizing","margin-top","margin-bottom"].forEach(function(t){X.css(t,e.css(t))});var Y="border-box"===e.css("box-sizing");Y&&(J+=parseInt(X.css("border-right-width"),10)+parseInt(X.css("border-left-width"),10));var Z=i.suggestionsWidth||J,et=(Z-12)/q|0,tt=i.responsiveIsh&&150>et;X.css("width",J);var nt=e.css("display");e.hide();var it=getComputedStyle(e[0]).width,rt=/%$/.test(it);rt&&X.css("width",it),"inline"===nt&&X.css("display","inline-block"),i.multiLine&&X.addClass("multi-line");var ot="selectionDirection"in e[0],at=z("test").appendTo(X),st=Y?X.outerHeight():X.innerHeight(),ct=i.multiLine?e.innerHeight():st;at.remove(),Y&&(ct+=parseInt(X.css("border-top-width"),10)+parseInt(X.css("border-bottom-width"),10)),X.css("height",ct);var lt=$("<span />").appendTo(X),ut=$("<input type='text' autocomplete='off' tabIndex='0'/>").appendTo(X).val(e.val()+" ").attr("placeholder",W),dt=$("<span />").appendTo(X),ft=e.attr("tabIndex"),ht=e.attr("id");if(ht){var pt=$("label[for='"+ht+"']");if(pt.length){var gt="tageditor-replacing-"+ht+"--input";ut.attr("id",gt),pt.attr("for",gt)}}ft&&ut.attr("tabIndex",ft),e.hasClass("s-input")&&(X.addClass("s-input").css({"paddingTop":0,"paddingBottom":0}),ut.addClass("s-input"));var mt,vt=!1,bt=function(){return i.showAllWhenEmptyAndFocused&&i.getDataPromise&&d()?(i.getDataPromise("").done(function(e){O(e.slice(0,StackExchange.settings.mentions.maxNumUsersInDropdown))}),!0):!1},yt=U;ut.focus(function(t,n){U=!0,a(),yt||(n||e.triggerHandler("focus",!0),yt=!0),bt()});var wt=!1;X.mousedown(function(){wt=!0,$(document).one("mouseup",function(){setTimeout(function(){U||(e.triggerHandler("blur"),yt=!1),wt=!1},0)})}),ut.blur(function(){U=!1,setTimeout(function(){vt||(D(),m(),wt||(e.triggerHandler("blur"),yt=!1)),wt=!1},0)}),e.focus(function(e,t){t||ut.trigger("focus",!0)}),ut.on({"keydown":E,"keyup":C,"input":function(){setTimeout(m,0)}}),X.delegate(".rendered-element","click",function(e){var t=$(this);$(e.target).hasClass("js-delete-tag")&&t.text(""),v(t),m()}),X.click(function(e){e.target===this&&(v(""),m())}),X.on("rerender",function(){h(),m(!0)});var kt,xt,St,$t={"left":1,"right":2,"all_left":3,"all_right":4,"all":5},Et={},Ct=0,Tt={"35":!0,"36":!0,"37":!0,"38":!0,"39":!0,"40":!0},_t={},It=StackExchange.helpers.DelayedReaction(function(e,t){StackExchange.helpers.addSpinner(X,{"position":"absolute","right":10,"top":ct/2-2});var n=null;if(i.getDataPromise)n=i.getDataPromise(e);else{var r=j(),o={"q":e,"newstyle":!0};i.alterQueryParametersBeforeSend&&i.alterQueryParametersBeforeSend(o),n=$.get(r,o,"json")}n.done(function(n){_t[A(e)]=n,StackExchange.helpers.removeSpinner(),t(n)})},400,{"sliding":!0});m(!0),StackExchange.tagEditor.ready.resolve(),e[0].func_clear=function(){e.val(""),ut.val("").blur(),X.find(".rendered-element").remove()},e[0].func_add=function(e){var t=ut.val();ut.val(e),v(t,!1,!0),m()},e[0].func_finish=function(){v("")},e[0].func_redraw=function(){var t=e.val();e.val(""),ut.val("").blur(),X.find(".rendered-element").remove(),ut.val(t),v("",!1,!0,!0),m()}},StackExchange.tagEditor.ready=$.Deferred();