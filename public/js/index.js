// document.getElementById('title').innerText = 'JS text';

// VARIABLES
let wl = document.getElementsByClassName('bg-wl');

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
        let diff = (section_1_height/2) - (wl[i].clientHeight/2) + mutation;
        wl[i].style.top = diff+'px';
        wl[i].style.left = -100+'px';
    }
}

document.getElementById('section_1').onmousemove = (event) => {
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