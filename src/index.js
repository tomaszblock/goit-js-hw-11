import Notiflix from 'notiflix';
import axios from 'axios';


const form = document.querySelector('.search-form')
const inputWindow = document.querySelector('input')
const gallery = document.querySelector('.gallery')




const createFixabay = async () => {
   const searching = inputWindow.value.split(" ").join('+')
   const data = await axios.get(`https://pixabay.com/api/?key=42489300-4271c1d54e84a75a5c8c2f4bb&q=${searching}&image_type=photo&orientation=horizontal&safesearch=true`)
   .then(res => {
    const array = res.data.hits;
    console.log(res.data);
   
    for (let i = 0 ; i < array.length ; i++) {
        gallery.insertAdjacentHTML(
            'beforeend', `<div class="photo-card">
            <img src="${array[i].webformatURL}" alt="${array[i].tags}" loading="lazy" width="300" height="200" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${array[i].likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${array[i].views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${array[i].comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${array[i].downloads}</b>
              </p>
            </div>
          </div>` )
    }

})

   return data
  };

  createFixabay()


  function search(event) {
    event.preventDefault();
    createFixabay()
   let test = document.querySelectorAll('.photo-card')
    test.forEach((element) => element.remove())
  
    

}

form.addEventListener('submit', search)
