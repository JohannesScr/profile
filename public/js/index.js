// document.getElementById('title').innerText = 'JS text';

function menu(event) {
    event.preventDefault();
    console.log(event.target.name);
    let submenu = document.getElementById(`menu_${event.target.name}`);
    submenu.classList.toggle('show-block');
}

let previous_submenu = null;

function submenu(event) {
    event.preventDefault();

    let submenu = document.getElementById(`submenu_${event.target.name}`);

    if (previous_submenu === `submenu_${event.target.name}`) {
        submenu.classList.toggle('hide-block');
    } else {

        let open = document.querySelectorAll('.nav-submenu');
        open.forEach(element => {
            for (let i = 0; i < element.classList.length; i++) {
                let list = element.classList.value.split(' ');
                let boolean = list.filter(class_name => {
                    return class_name === 'hide-block';
                });

                if (boolean.length === 0) {
                    element.classList.add('hide-block');
                }
            }
        });

        submenu.classList.toggle('hide-block');
        previous_submenu = `submenu_${event.target.name}`;
    }
}