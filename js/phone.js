const loadPhone=async (phoneName)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data=await res.json();
    const phonesDetails=data.data
    // console.log(phonesDetails);
    displayPhone(phonesDetails);
}
const displayPhone=phonesDetails=>{
    const phoneContainer=document.getElementById('card-container');
    // clear phone container for new search result 
    phoneContainer.textContent='';

    const showAllBtnContainer=document.getElementById('show-all-btn-container');
    if(phonesDetails.length>12){
        showAllBtnContainer.classList.remove('hidden');
    }
    else{
        showAllBtnContainer.classList.add('hidden')
    }

    const phones=phonesDetails.slice(0,12);

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-2xl`;
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Phones" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
}

const handleSearch=()=>{
    const inputField=document.getElementById('input-field');
    const searchName=inputField.value;
    loadPhone(searchName);
}

loadPhone();    