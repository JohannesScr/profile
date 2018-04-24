// document.getElementById('title').innerText = 'JS text';

// VARIABLES
let wl = document.getElementsByClassName('bg-wl');

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

function section_1_bg() {
    let section_1_height = document.getElementsByClassName('section-1')[0].clientHeight;
    wl = document.getElementsByClassName('bg-wl');

    let mutation = 0;
    for (let i = 0; i < wl.length; i++) {
        switch (i) {
            case 0:
                mutation = 17;
                break;
            case 1:
                mutation = -172;
                break;
            case 2:
                mutation = 143;
                break;
            case 3:
                mutation = -187;
                break;
            case 4:
                mutation = -51;
                break;
            case 5:
                mutation = -271;
                break;
            case 6:
                mutation = 43;
                break;
            case 7:
                mutation = -209;
                break;
        }
        console.log(mutation);
        let diff = (section_1_height/2) - (wl[i].clientHeight/2) + mutation;
        wl[i].style.top = diff+'px';
        wl[i].style.left = -100+'px';
    }
}

document.getElementById('section_1').onmousemove = (event) => {
    console.log(event);

    let x = event.movementX;
    let y = event.movementY;
    let mutation_x = 0;
    let mutation_y = 0;
    for (let i = 0; i < wl.length; i++) {
        let top = Number(wl[i].style.top.replace(/px/, ''));
        let left = Number(wl[i].style.left.replace(/px/, '')) || 0;
        switch (i) {
            case 0:
                mutation_y = 0.1 * y;
                mutation_x = 0.1 * x;
                break;
            case 1:
                mutation_y = -1 * 0.1 * y;
                mutation_x = -1 * 0.1 * x;
                break;
            case 2:
                mutation_y = -1 * 0.05 * y;
                mutation_x = -1 * 0.05 * x;
                break;
            case 3:
                mutation_y = -1 * 0.05 * y;
                mutation_x = -1 * 0.05 * x;
                break;
            case 4:
                mutation_y = 0.03 * y;
                mutation_x = 0.03 * x;
                break;
            case 5:
                mutation_y = -1 * 0.02 * y;
                mutation_x = -1 * 0.02 * x;
                break;
            case 6:
                mutation_y = 0.01 * y;
                mutation_x = 0.01 * x;
                break;
            case 7:
                mutation_y = 0.01 * y;
                mutation_x = 0.01 * x;
                break;
        }
        console.log(x, y, mutation_x, mutation_y);
        let new_left = left + mutation_x;
        let new_top = top + mutation_y;

        wl[i].style.top = new_top+'px';
        wl[i].style.left = new_left+'px';
    }
};

// Initialize window
let init_load = true;
if (init_load) {
    setTimeout(section_1_bg, 10);
    init_load = false;
}
//
window.onratechange = () => {
    section_1_bg();
};