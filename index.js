import{a as y}from"./assets/vendor-B2N6ulqC.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const L=()=>!refs.backdrop.classList.contains("is-hidden");function b(e){e.key==="Escape"&&L()&&a()}function M(e){e.target===e.currentTarget&&a()}function a(){refs.backdrop.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}const E="https://furniture-store-v2.b.goit.study/api",w={FURNITURES:"/furnitures"},f=8,n={furnitureList:document.querySelector(".furniture-list"),loadMoreBtn:document.querySelector(".furniture-show-more"),backdrop:document.querySelector(".backdrop"),modalCloseBtn:document.querySelector(".js-close-modal")};async function m(){const e=E+w.FURNITURES,r={page:l,limit:f};return(await y.get(e,{params:r})).data}function B(e){const r=String(e).trim().toLowerCase();return r==="#fff"||r==="#ffffff"||r==="white"?"furniture-color-item furniture-color-item--light":"furniture-color-item"}function k(e){var i;const r=((i=e.images)==null?void 0:i[0])??"",s=e.name||"Без назви",c=Number(e.price||0).toLocaleString("uk-UA"),o=(e.color||[]).slice(0,3).map(d=>`
			<li class="${B(d)}" style="background-color: ${d}"></li>
		`).join("");return`
		<li class="furniture-item">
			<img
				class="furniture-item-img"
				src="${r}"
				alt="${s}"
				width="335"
				loading="lazy"
			/>
			<div class="furniture-desc-wrap">
				<h3 class="furniture-item-name">${s}</h3>
				${o?`<ul class="furniture-colors">${o}</ul>`:""}
				<p class="furniture-item-price">${c} грн</p>
			</div>
			<button type="button" class="furniture-item-btn">Детальніше</button>
		</li>
	`}async function p(e){if(!n.furnitureList)return;if(e.length===0){n.furnitureList.innerHTML="";return}const r=e.map(k).join("");n.furnitureList.insertAdjacentHTML("beforeend",r)}function v(){n.loadMoreBtn&&n.loadMoreBtn.classList.remove("is-hidden")}function u(){n.loadMoreBtn&&n.loadMoreBtn.classList.add("is-hidden")}function h(e){l>=g?u():v()}function S(){const r=n.furnitureList.lastElementChild.getBoundingClientRect().height;window.scrollBy({top:r,behavior:"smooth"})}n.modalCloseBtn.addEventListener("click",a);n.backdrop.addEventListener("click",M);document.addEventListener("keydown",b);let g,l=1;document.addEventListener("DOMContentLoaded",async()=>{u();try{const e=await m();g=Math.ceil(e.totalItems/f),p(e.furnitures),h()}catch(e){console.error("Помилка при завантаженні меблів:",e)}});n.loadMoreBtn.addEventListener("click",async()=>{l+=1,u();try{const e=await m();p(e.furnitures),S(),h()}catch(e){console.error("Помилка при завантаженні меблів:",e)}});
//# sourceMappingURL=index.js.map
