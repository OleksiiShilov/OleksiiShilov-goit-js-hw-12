import{a as S,S as q,i as n}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();async function m(e,t=1){const s=new URLSearchParams({key:"44116350-6386c211d371838e745950ec7",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15});try{const a=await S.get("https://pixabay.com/api/",{params:s});return console.log(a),a.data}catch(a){throw new Error(a.message)}}function P({webformatURL:e,largeImageURL:t,tags:s,likes:a,views:r,comments:o,downloads:i}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img class="gallery-image" src="${e}" alt="${s}"/>
      </a>
      <ul class="info">
        <li class="info-item"> <b>Likes</b> ${a} </li>
        <li class="info-item"> <b>Views</b> ${r} </li>
        <li class="info-item"> <b>Comments</b> ${o} </li>
        <li class="info-item"> <b>Downloads</b> ${i} </li>
      </ul>
    </li>
  `}function h(e){return e.map(P).join("")}const v=document.querySelector(".search-form"),E=document.querySelector(".input"),c=document.querySelector(".gallery"),f=document.querySelector(".loader"),d=document.querySelector("#load-more");let l=1,u="",g=0,y=new q(".gallery a",{captionDelay:250,captionsData:"alt"});function p(){f.classList.remove("hidden")}function L(){f.classList.add("hidden")}function M(){d.classList.remove("hidden")}function b(){d.classList.add("hidden")}v.addEventListener("submit",async e=>{e.preventDefault();const t=E.value.trim();if(t===""){n.error({title:"Error",message:"Please enter a search query"});return}if(t!==u){l=1,u=t,c.innerHTML="",p(),b();try{const s=await m(t,l);if(g=s.totalHits,s.hits.length===0)n.error({message:"❌ Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight",maxWidth:350,timeout:5e3,progressBar:!1});else{const a=h(s.hits);c.innerHTML=a,y.refresh(),l++,w()}}catch(s){console.error(s),n.error({title:"Error",message:"Sorry, an error occurred while fetching the images. Please try again later."})}finally{L()}}e.target.reset()});d.addEventListener("click",async()=>{p();try{const e=await m(u,l);if(e.hits.length>0){const t=h(e.hits);c.insertAdjacentHTML("beforeend",t),y.refresh(),l++,w(),O()}}catch(e){console.error(e),n.error({title:"Error",message:"Sorry, an error occurred while fetching the images. Please try again later."})}finally{L()}});function w(){c.querySelectorAll(".gallery-item").length<g?M():(b(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3}))}function O(){const e=document.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map