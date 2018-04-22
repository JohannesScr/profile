document.getElementById('title').innerText = 'JS text';

let menu_default = document.getElementById('menu_default');

menu_default.addEventListener('click', (event) => {
    event.preventDefault();
    let main_menu = document.getElementById('main_menu');
    main_menu.classList.toggle('show-block');
});
