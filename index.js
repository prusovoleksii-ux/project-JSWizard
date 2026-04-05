import{A as y,a as L}from"./assets/vendor-bDcoTsJj.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();function M(){new y(".accordion-container",{duration:300,showMultiple:!1})}const b=()=>!refs.backdrop.classList.contains("is-hidden");function w(e){e.key==="Escape"&&b()&&a()}function E(e){e.target===e.currentTarget&&a()}function a(){refs.backdrop.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}const B="https://furniture-store-v2.b.goit.study/api",k={FURNITURES:"/furnitures"},f=8,n={furnitureList:document.querySelector(".furniture-list"),loadMoreBtn:document.querySelector(".furniture-show-more"),backdrop:document.querySelector(".backdrop"),modalCloseBtn:document.querySelector(".js-close-modal")};async function m(){const e=B+k.FURNITURES,r={page:l,limit:f};return(await L.get(e,{params:r})).data}function v(e){const r=String(e).trim().toLowerCase();return r==="#fff"||r==="#ffffff"||r==="white"?"furniture-color-item furniture-color-item--light":"furniture-color-item"}function S(e){var s;const r=((s=e.images)==null?void 0:s[0])??"",i=e.name||"Без назви",c=Number(e.price||0).toLocaleString("uk-UA"),o=(e.color||[]).slice(0,3).map(d=>`
			<li class="${v(d)}" style="background-color: ${d}"></li>
		`).join("");return`
		<li class="furniture-item">
			<img
				class="furniture-item-img"
				src="${r}"
				alt="${i}"
				width="335"
				loading="lazy"
			/>
			<div class="furniture-desc-wrap">
				<h3 class="furniture-item-name">${i}</h3>
				${o?`<ul class="furniture-colors">${o}</ul>`:""}
				<p class="furniture-item-price">${c} грн</p>
			</div>
			<button type="button" class="furniture-item-btn">Детальніше</button>
		</li>
	`}async function p(e){if(!n.furnitureList)return;if(e.length===0){n.furnitureList.innerHTML="";return}const r=e.map(S).join("");n.furnitureList.insertAdjacentHTML("beforeend",r)}function O(){n.loadMoreBtn&&n.loadMoreBtn.classList.remove("is-hidden")}function u(){n.loadMoreBtn&&n.loadMoreBtn.classList.add("is-hidden")}function h(e){l>=g?u():O()}function I(){const r=n.furnitureList.lastElementChild.getBoundingClientRect().height;window.scrollBy({top:r,behavior:"smooth"})}n.modalCloseBtn.addEventListener("click",a);n.backdrop.addEventListener("click",E);document.addEventListener("keydown",w);let g,l=1;document.addEventListener("DOMContentLoaded",async()=>{M(),u();try{const e=await m();g=Math.ceil(e.totalItems/f),p(e.furnitures),h()}catch(e){console.error("Помилка при завантаженні меблів:",e)}});n.loadMoreBtn.addEventListener("click",async()=>{l+=1,u();try{const e=await m();p(e.furnitures),I(),h()}catch(e){console.error("Помилка при завантаженні меблів:",e)}});
//# sourceMappingURL=index.js.map
