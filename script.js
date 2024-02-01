const myAPIKEY="90b4a46ae0a14d70921d8978afc2b327"
const URL="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews("India"));

function reload(){
    window.location.reload()
}

async function fetchNews (query){
  const res= await  fetch(`${URL}${query}&apiKey=${myAPIKEY}`);
  const data=await res.json()
  bindData(data.articles);

}
function bindData(articles){
  const  cardsContainer=document.getElementById('cards-container')
  const newsCardTemplate=document.getElementById('template-news-card')

  cardsContainer.innerHTML='';

  articles.forEach(articles => {
    if(!articles.urlToImage)
    return;
const cardClone= newsCardTemplate.content.cloneNode(true);
fillDataInCard(cardClone,articles)
cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone,articles){
    const newsImg=cardClone.querySelector('#news-img')
    const newsTitle=cardClone.querySelector('#news-title')
    const newsSource=cardClone.querySelector('#news-source')
    const newsDesk=cardClone.querySelector('#news-desk')

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML=articles.title;
    newsDesk.innerHTML = articles.description;

    const date= new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${articles.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=> {
       window.open(articles.url, "_blank");
    });
}

let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectedNav?.classlist.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classlist.add('active');


}

const searchbtn = document.getElementById('searchbtn')
const searchText= document.getElementById('search-text');

searchbtn.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);

})