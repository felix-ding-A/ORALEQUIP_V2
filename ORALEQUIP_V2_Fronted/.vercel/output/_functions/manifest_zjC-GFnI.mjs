import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_BuER0NxL.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Bw8J3JCh.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/","cacheDir":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/node_modules/.astro/","outDir":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/dist/","srcDir":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/","publicDir":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/public/","buildClientDir":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/dist/client/","buildServerDir":"file:///E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"premium-selection/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/premium-selection","isIndex":true,"type":"page","pattern":"^\\/premium-selection\\/?$","segments":[[{"content":"premium-selection","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/premium-selection/index.astro","pathname":"/premium-selection","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"quote/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/quote","isIndex":false,"type":"page","pattern":"^\\/quote\\/?$","segments":[[{"content":"quote","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quote.astro","pathname":"/quote","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-quote","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-quote\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-quote","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-quote.ts","pathname":"/api/submit-quote","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.oralequip.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/about.astro",{"propagation":"none","containsHead":true}],["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/index.astro",{"propagation":"none","containsHead":true}],["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/premium-selection/[slug].astro",{"propagation":"none","containsHead":true}],["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/premium-selection/index.astro",{"propagation":"none","containsHead":true}],["E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/pages/quote.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/submit-quote@_@ts":"pages/api/submit-quote.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/premium-selection/[slug]@_@astro":"pages/premium-selection/_slug_.astro.mjs","\u0000@astro-page:src/pages/premium-selection/index@_@astro":"pages/premium-selection.astro.mjs","\u0000@astro-page:src/pages/quote@_@astro":"pages/quote.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_zjC-GFnI.mjs","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BAurny3e.mjs","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/components/ProductFilter":"_astro/ProductFilter.CCeqXgZO.js","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/components/InquiryCart":"_astro/InquiryCart.C3GyoHq-.js","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/components/CartBadge":"_astro/CartBadge.BaeI8yrO.js","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/components/NavbarMobile":"_astro/NavbarMobile.CJdiQX9R.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.BFuuksmq.js","E:/03-Web_code/ORALEQUIP_V2/ORALEQUIP_V2_Fronted/src/components/ProductDetail":"_astro/ProductDetail.C_hJ5q1r.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.D2HQv68v.css","/apple-touch-icon.png","/favicon-96x96.png","/favicon.ico","/favicon.svg","/pageicon.svg","/robots.txt","/site.webmanifest","/web-app-manifest-192x192.png","/web-app-manifest-512x512.png","/image/Dr song's dental clinic.webp","/image/Dr Song's office.webp","/_astro/browser.97S4chIR.js","/_astro/CartBadge.BaeI8yrO.js","/_astro/client.Dc9Vh3na.js","/_astro/createLucideIcon.D9lbWeBd.js","/_astro/index.Bp2ogjzR.js","/_astro/index.DiEladB3.js","/_astro/InquiryCart.C3GyoHq-.js","/_astro/inquiryStore.BI3Hjoa1.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/NavbarMobile.CJdiQX9R.js","/_astro/ProductDetail.C1E5odCa.js","/_astro/ProductDetail.C_hJ5q1r.js","/_astro/ProductFilter.CCeqXgZO.js","/_astro/stegaEncodeSourceMap.BFuuksmq.js","/about/index.html","/blog/index.html","/premium-selection/index.html","/quote/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"1ZSiEEh52rONQyx2stAha8hqwalpVJ4UdHZ6N3HzrYg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
