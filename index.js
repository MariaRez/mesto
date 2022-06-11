let like = document.querySelector('.element__like');

function tolike(){
    like.classList.toggle('element__like_active');
}

like.addEventListener('click', tolike);

