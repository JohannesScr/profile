document.getElementById('title').innerText = 'JS text';

let menu_default = document.getElementById('menu_default');

menu_default.addEventListener('click', (event) => {
    event.preventDefault();
    let main_menu = document.getElementById('main_menu');
    main_menu.classList.toggle('show-block');
});

function menu(event) {
    event.preventDefault();
    console.log(event.target.name);
    let submenu = document.getElementById(`menu_${event.target.name}`);
    submenu.classList.toggle('show-block');
}

function submenu(event) {
    event.preventDefault();
    console.log(event.target.name);
    let submenu = document.getElementById(`submenu_${event.target.name}`);
    submenu.classList.toggle('hide-block');
}