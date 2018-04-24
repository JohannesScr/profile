
// Primarily for the canvas footer
// let canvas = document.getElementById('tutorial');
//
// let ctx = canvas.getContext('2d');

// BASIC SHAPES
// ctx.fillStyle = 'rgb(200, 0, 0)';
// ctx.fillRect(10, 10, 50, 50);

// ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
// ctx.fillRect(30, 30, 50, 50);

// ctx.fillRect(25, 25, 100, 100);
// ctx.clearRect(45, 45, 60, 60);
// ctx.strokeRect(50, 50, 50, 50);

// PATHS
// ctx.beginPath();
// ctx.moveTo(75, 50);
// ctx.lineTo(100, 75);
// ctx.lineTo(100, 25);
// ctx.fill();

// let point_coord = [[50, 50, 100, 70], [100, 20, 80, 150]];
// let point_size = [5, 10];
let point_coord;
let point_size;
let point_step;
// let point;

function draw() {
    let canvas = document.getElementById('tutorial');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < point_coord.length; i++) {

        // let p1 = new Path2D();
        // p1.beginPath();
        // p1.arc(point_coord[i][0], point_coord[i][1], point_size[i][0], 0, Math.PI * 2, true);
        // p1.fill();

        // let p2 = new Path2D();
        // p2.beginPath();
        // p2.arc(point_coord[i][2], point_coord[i][3], point_size[i][1], 0, Math.PI * 2, true);
        // p2.fill();

        // let p1_p2 = new Path2D();
        // p1_p2.beginPath();
        // p1_p2.moveTo(point_coord[i][0], point_coord[i][1]);
        // p1_p2.lineTo(point_coord[i][2], point_coord[i][3]);
        // p1_p2.stroke();


        ctx.beginPath();
        ctx.arc(point_coord[i][0], point_coord[i][1], point_size[i][0], 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point_coord[i][2], point_coord[i][3], point_size[i][1], 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(point_coord[i][0], point_coord[i][1]);
        ctx.lineTo(point_coord[i][2], point_coord[i][3]);
        ctx.stroke();
    }
}

function init_canvas() {
    let population = 5;
    let x_max = 1500;
    let x_min = 0;
    let x_range = 100;
    let y_max = 300;
    let y_min = 0;
    let y_range = 100;
    let r_max = 10;
    let r_min = 1;
    let point_coordinates = [];
    let point_sizes = [];
    let point_steps = [];

    for (let i = 0; i < population; i++) {
        let x1 = Math.floor(Math.random() * (x_max - x_min)) + x_min;
        let x2 = Math.floor(Math.random() * x_range) + x1;
        let y1 = Math.floor(Math.random() * (y_max - y_min)) + y_min;
        let y2 = Math.floor(Math.random() * y_range) + y1;

        let r1 = Math.floor(Math.random() * (r_max - r_min)) + r_min;
        let r2 = Math.floor(Math.random() * (r_max - r_min)) + r_min;

        point_coordinates.push([x1, y1, x2, y2]);
        point_sizes.push([r1,  r2]);
        point_steps.push({ counter: 0, n: Math.round(Math.random() * 1000), direction: (Math.round(Math.random() >= 0.5 ? 1 : -1)) });
        point_steps.push({ counter: 0, n: Math.round(Math.random() * 200), direction: (Math.round(Math.random() >= 0.5 ? 1 : -1)) });
        point_steps.push({ counter: 0, n: Math.round(Math.random() * 1000), direction: (Math.round(Math.random() >= 0.5 ? 1 : -1)) });
        point_steps.push({ counter: 0, n: Math.round(Math.random() * 200), direction: (Math.round(Math.random() >= 0.5 ? 1 : -1)) });

    }

    point_coord = point_coordinates;
    point_size = point_sizes;
    point_step = point_steps;
    draw();
}

function animate_canvas() {
    let step = 0.1;
    setInterval(() => {
        for (let i = 0; i < point_coord.length; i++) {
            for (let j = 0; j < point_coord[i].length; j++) {
                // let direction = Math.round(Math.random());
                if (point_step[i+j].counter > point_step[i+j].n) {
                    point_step[i+j].counter = 0;
                    point_step[i+j].direction *= -1;
                }

                // let direction = Math.round(Math.random());
                // direction = direction >= 0.9 ? 1 : -1;
                point_coord[i][j] = point_coord[i][j] + (step * point_step[i+j].direction);
                point_step[i+j].counter += 1;
            }
        }
        draw();
        // console.log(point_step);
    }, 10);
}

// init_canvas();
// animate_canvas();




// CIRCLE
// ctx.beginPath();
// ctx.arc(50, 50, 10, 0, Math.PI * 2, true);
// ctx.fill();

// CIRCLE
// ctx.beginPath();
// ctx.arc(50, 50, 10, 0, Math.PI * 2, true);
// ctx.fill();
