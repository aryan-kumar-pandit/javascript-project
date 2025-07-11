const accessKey = 'SqoOto9-WUogq01cR4M00EMaV5ejzoTMWJtcS8JA0lk';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page=1;
// image api from unsplash.com

//function to fetch images using unsplash api
const fetchImages = async (query,pageNo)=>{
    try {
 
    if(pageNo===1){
        imagesContainer.innerHTML = '';
    }
    
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${query}&per_page=28&page=${pageNo}`;
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    if(data.results.length>0){
    data.results.forEach(photo => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML = `<img src="${photo.urls.regular}" />`;

        //creating overlay
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        // creating overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;


        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
    });

    if(data.total_pages===pageNo){
        loadMoreBtn.style.display ="none";
    }
    else{
        loadMoreBtn.style.display ="block";
    }
}
else{
    imagesContainer.innerHTML =`<h2>Image Not Found !!!</h2>`;
}
       
    } catch (error) {
        imagesContainer.innerHTML =`<h2>Error Occured</h2>`;
        loadMoreBtn.style.display = "none";
    }
};
// adding event listner to search form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();// prevents auto submit of form
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        page=1;
        fetchImages(inputText,page);
    }else{
        imagesContainer.innerHTML =`<h2>Please enter a search query.</h2>`;
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
});

// Adding event listener to load more images
loadMoreBtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(),++page);
})