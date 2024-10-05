function getTimeString(time) {
    const day = parseInt(time / (24 * 3600));

    let remainingHour = time % (24 * 3600);
    const hour = parseInt(remainingHour / 3600);

    let remainingMinute = time % 3600;
    const minute = parseInt(remainingMinute / 60);

    const second = time % 60;

    return `${day} day ${hour} hour ${minute} minute ${second} second ago`;
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (const btn of buttons) {
        btn.classList.remove("active");
    }
}
// create loadCategories 
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        // .then((data) => displayCategories(data.categories))
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}

const loadCategoryVideo = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(id);
            activeBtn.classList.add("active");
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
}

// create displayCategories 
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories");
    categories.forEach(item => {
        console.log(item);
        // create button 
        // const button = document.createElement('button');
        // button.classList = 'btn font-bold';
        // button.innerText = item.category;
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class="btn font-bold category-btn">${item.category}</button>
        `;
        // add button 
        // categoriesContainer.appendChild(button);
        categoriesContainer.appendChild(buttonContainer);
    });
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="/images/Icon.png" alt="">
    <div>
        <h3 class="font-bold text-center">Oops!! Sorry <br>There is no content here</h3>
    </div>
</div>
        `;
        return;
    }
    else {
        videoContainer.classList.add('grid');
    }

    videos.forEach(videos => {
        console.log(videos);
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
       <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${videos.thumbnail}
      alt="Shoes" />
      ${videos.others.posted_date?.length == 0 ? "" : `<span class="text-xs absolute right-2 bottom-2 bg-black text-white rounded p-1"> ${getTimeString(videos.others.posted_date)} </span>`}
  </figure>
  <div class="py-2 flex gap-3">
        <div>
            <img class="w-10 h-10 rounded-full object-cover" src="${videos.authors[0].profile_picture}" alt="">
        </div>

        <div>
            <h4 class="font-bold">${videos.title}</h4>
            <div class="flex items-center gap-2">
            <p class="text-gray-600">${videos.authors[0].profile_name}</p>
            

            ${videos.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">' : " "}
        </div>
            <p class="text-gray-400">${videos.others.views} views</p>
        </div>
  </div>
        `;
        videoContainer.append(card);
    })
}

// function call 
loadCategories();
loadVideos();