import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DiEladB3.js";import{c as a}from"./createLucideIcon.D9lbWeBd.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],l=a("Menu",i);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],d=a("X",c),m=[{href:"/",label:"Home"},{href:"/premium-selection",label:"Premium Selection"},{href:"/about",label:"About Us"},{href:"/blog",label:"Blog"}];function h({currentPath:n}){const[r,t]=s.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"md:hidden p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors",onClick:()=>t(!r),"aria-label":"Toggle menu","aria-expanded":r,children:r?e.jsx(d,{size:24}):e.jsx(l,{size:24})}),r&&e.jsxs("div",{className:"md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[var(--border)] px-4 py-4 space-y-1 shadow-lg z-50",children:[m.map(o=>e.jsx("a",{href:o.href,onClick:()=>t(!1),className:`block px-4 py-2.5 rounded-xl transition-colors ${n===o.href?"bg-[var(--primary)]/10 text-[var(--primary)]":"text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"}`,children:o.label},o.href)),e.jsx("a",{href:"mailto:info@oralequip.com",onClick:()=>t(!1),className:"block text-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl mt-2 hover:opacity-90 transition-opacity",children:"Request a Quote"})]})]})}export{h as NavbarMobile};
