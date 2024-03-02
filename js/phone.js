const loadPhone=async (phoneName='iphone',isShowAll)=>{
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

    // console.log('The value is:',isShowAll);

    if(!isShowAll){
        phonesDetails=phonesDetails.slice(0,12);
    }

    phonesDetails.forEach(phone => {
        // console.log(phone);
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-2xl p-4`;
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Phones" /></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${phone.phone_name}</h2>
            <p class="text-center">IThere are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetailsOption('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    loadingFeature(false);
}

const handleShowDetailsOption=async phoneDetailsId=>{
    // console.log('get the details of:',phoneDetailsId);
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${phoneDetailsId}`);
    const data=await res.json();
    const phoneInfo=data.data;
    showPhoneDetailsInfo(phoneInfo)
}
const showPhoneDetailsInfo=(Phonedata)=>{
    console.log(Phonedata);
    const phoneDetailsContainer=document.getElementById('phone-details-container');
    phoneDetailsContainer.textContent='';
    const div=document.createElement('div');
    div.innerHTML=`
    <div class="flex justify-center bg-[#0D6EFD0D] rounded-2xl"><img src="${Phonedata.image}" alt=""></div>
    <div>
    <h2 class="text-xl font-bold">${Phonedata.name}</h2>
    <p class="text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <span class="text-base font-bold">Storage:</span><span class="text-[#706F6F]">${Phonedata?.mainFeatures?.storage}</span><br>
    <span class="text-base font-bold">Display Size:</span><span class="text-[#706F6F]">${Phonedata?.mainFeatures?.displaySize
    }</span><br>
    <span class="text-base font-bold">ChipSet:</span><span class="text-[#706F6F]">${Phonedata?.mainFeatures?.chipSet}</span><br>
    <span class="text-base font-bold">Slug:</span><span class="text-[#706F6F]">${Phonedata?.slug}</span><br>
    <span class="text-base font-bold">ReleaseDate:</span><span class="text-[#706F6F]">${Phonedata?.releaseDate || 'N/A'}</span><br>
    <span class="text-base font-bold">Brand:</span><span class="text-[#706F6F]">${Phonedata?.brand || 'N/A'}</span><br>
    <span class="text-base font-bold">GPS:</span><span class="text-[#706F6F]">${Phonedata?.others?.GPS || 'No GPS Sensor'}</span><br>
    </div>
    `
    phoneDetailsContainer.appendChild(div);
    Show_details_modal.showModal()
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
loadPhone() ;
