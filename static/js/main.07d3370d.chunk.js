(this["webpackJsonpair-quality-report"]=this["webpackJsonpair-quality-report"]||[]).push([[0],{21:function(t,e,a){},41:function(t,e,a){},43:function(t,e,a){},44:function(t,e,a){"use strict";a.r(e);var n=a(2),c=a.n(n),r=a(16),i=a.n(r),s=(a(21),a(3)),u=a.n(s),o=a(7),d=a(4),l=a(5),j=a.n(l),b=(a(41),a(0)),p=function(){var t=Object(n.useState)("?"),e=Object(d.a)(t,2),a=e[0],c=e[1],r=Object(n.useState)("Loading Data..."),i=Object(d.a)(r,2),s=i[0],l=i[1],p=Object(n.useState)(""),O=Object(d.a)(p,2),f=O[0],h=O[1],x=Object(n.useState)(""),m=Object(d.a)(x,2),v=m[0],g=m[1],y=function(){var t=Object(o.a)(u.a.mark((function t(){var e,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("https://v6q7nq61ab.execute-api.us-west-1.amazonaws.com/default/getAirQuality");case 2:return e=t.sent,c(e.data.ip),setTimeout(1e3),t.next=7,j.a.get("https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=".concat(a));case 7:(n=t.sent).data.error?l("ERROR - "+n.data.error):(g(n.data.data.state),h(n.data.data.city),l("US AQI ".concat(n.data.data.current.pollution.aqius)));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(){var t=Object(o.a)(u.a.mark((function t(){var e;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l("Reloading..."),t.next=3,j.a.get("https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=".concat(a));case 3:(e=t.sent).data.error?l("Error requesting from API"):(g(e.data.data.state),h(e.data.data.city),l("US AQI ".concat(e.data.data.current.pollution.aqius)));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){y()}),[]),Object(b.jsxs)("div",{className:"main-container",children:[Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"ip-text",children:["IP: ",a]}),Object(b.jsxs)("div",{className:"location-text",children:["Location: ",f.length>0?"".concat(f,", ").concat(v):"?"]}),Object(b.jsxs)("div",{className:"quality-text",children:["Air Quality : ",s]}),Object(b.jsx)("button",{className:"btn",onClick:w,children:"Reload Data"})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{}),Object(b.jsx)("input",{}),Object(b.jsx)("input",{}),Object(b.jsx)("button",{className:"btn",children:"Search"})]}),Object(b.jsx)("div",{className:"quality-bar",children:"a"})]})};a(43);var O=function(){return Object(b.jsx)(p,{})},f=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,45)).then((function(e){var a=e.getCLS,n=e.getFID,c=e.getFCP,r=e.getLCP,i=e.getTTFB;a(t),n(t),c(t),r(t),i(t)}))};i.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(O,{})}),document.getElementById("root")),f()}},[[44,1,2]]]);
//# sourceMappingURL=main.07d3370d.chunk.js.map