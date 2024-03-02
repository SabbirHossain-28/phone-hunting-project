const loadPhone=async (phoneName,isShowAll)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data=await res.json();
    const phonesDetails=data.data
    // console.log(phonesDetails);
    displayPhone(phonesDetails,isShowAll);
}
const displayPhone=(phonesDetails,isShowAll)=>{
    const phoneContainer=document.getElementById('card-container');
    // clear phone container for new search result 
    phoneContainer.textContent='';

    const showAllBtnContainer=document.getElementById('show-all-btn-container');
    if(phonesDetails.length>12 && !isShowAll){
        showAllBtnContainer.classList.remove('hidden');
    }
    else{
        showAllBtnContainer.classList.add('hidden')
    }

    console.log('The value is:',isShowAll);

    if(!isShowAll){
        phonesDetails=phonesDetails.slice(0,12);
    }

    phonesDetails.forEach(phone => {
        // console.log(phone);
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-2xl`;
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Phones" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    loadingFeature(false);
}

const handleSearch=(isShowAll)=>{
    loadingFeature(true);
    const inputField=document.getElementById('input-field');
    const searchName=inputField.value;
    loadPhone(searchName,isShowAll);
}

const loadingFeature=(isLoading)=>{
    const loadingBar=document.getElementById('loading-bar');
    if(isLoading){
        loadingBar.classList.remove('hidden')
    }
    else{
        loadingBar.classList.add('hidden')
    }
}

const showAllPhone=()=>{
    handleSearch(true);
}

// loadPhone();    
