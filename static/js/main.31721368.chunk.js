(this["webpackJsonpair-quality-report"]=this["webpackJsonpair-quality-report"]||[]).push([[0],{21:function(t,e,a){},41:function(t,e,a){},43:function(t,e,a){},44:function(t,e,a){"use strict";a.r(e);var n=a(2),c=a.n(n),s=a(15),r=a.n(s),i=(a(21),a(5)),o=a.n(i),u=a(16),l=a(3),j=a(6),d=a.n(j),b=(a(41),a(0)),O=function(){var t=Object(n.useState)("?"),e=Object(l.a)(t,2),a=e[0],c=e[1],s=Object(n.useState)("Loading Data..."),r=Object(l.a)(s,2),i=r[0],j=r[1],O=Object(n.useState)(""),h=Object(l.a)(O,2),x=h[0],p=h[1],f=Object(n.useState)(""),g=Object(l.a)(f,2),m=g[0],v=g[1],y=function(){var t=Object(u.a)(o.a.mark((function t(){var e,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("https://geolocation-db.com/json/");case 2:return e=t.sent,console.log(e),c(e.data.IPv4),t.next=7,d.a.get("https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=".concat(a));case 7:n=t.sent,console.log(n.data.error),n.data.error?j("Error requesting from API"):(v(n.data.data.state),p(n.data.data.city),j("US AQI ".concat(n.data.data.current.pollution.aqius))),console.log(n.data),console.log(n.data.error);case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){y()}),[]),Object(b.jsxs)("div",{className:"main-container",children:[Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"ip-text",children:["IP: ",a]}),Object(b.jsxs)("div",{className:"location-text",children:["Location: ",x.length>0?"".concat(x,", ").concat(m):"?"]}),Object(b.jsxs)("div",{className:"quality-text",children:["Air Quality : ",i]}),Object(b.jsx)("button",{className:"btn",onClick:y,children:"Reload Data"})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{}),Object(b.jsx)("input",{}),Object(b.jsx)("input",{}),Object(b.jsx)("button",{className:"btn",children:"Search"})]}),Object(b.jsx)("div",{className:"quality-bar",children:"a"})]})};a(43);var h=function(){return Object(b.jsx)(O,{})},x=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,45)).then((function(e){var a=e.getCLS,n=e.getFID,c=e.getFCP,s=e.getLCP,r=e.getTTFB;a(t),n(t),c(t),s(t),r(t)}))};r.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(h,{})}),document.getElementById("root")),x()}},[[44,1,2]]]);
//# sourceMappingURL=main.31721368.chunk.js.map