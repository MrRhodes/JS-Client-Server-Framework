
define(function () {

    APP = {
        canvas: null,
        context: null,
        pause: function () {
            window.cancelAnimationFrame(APP.core.animationFrame);
        },
        play: function () {
            APP.core.then = Date.now();
            APP.core.frame();
        },
        setup: function () {
            APP.canvas = document.getElementById('canvas');
            APP.context = APP.canvas.getContext('2d');
        },
        getRandomColour: function () {
            var letters = '0123456789ABCDEF'.split('');
            var colour = '#';
            for (var i = 0; i < 6; i++) {
                colour += letters[Math.round(Math.random() * 15)];
            }
            return colour;
        }
    };

    APP.world = {

        dimensions: [3000, 3000],
        viewport: [0, 0, 900, 600],
        extremes: [0, 0, 900, 600],
        elements: [],

        setup: function () {

            var x, y;

            for (var i = 0; i < 1; i++) {

                x = Math.random() * 900;
                y = Math.random() * 600;

                APP.world.elements.push({
                    id: i,
                    x: x,
                    y: y,
                    colour: APP.getRandomColour(),
                    x2: x + Math.random() * 2 - 1,
                    y2: y + Math.random() * 2 - 1,
                    mass: 5 + Math.random() * 10,
                    radius: 10 + Math.random() * 5
                });
            }
        },

        update: function (delta) {

            //verlet.

            var element, element2;
            var dx, dy, d, nx, ny;


            // process positions.

            for (var i = 0; element = APP.world.elements[i]; i++) {

                // delta xy
                dx = element.x - element.x2;
                dy = element.y - element.y2;

                element.x2 = element.x;
                element.y2 = element.y;

                // distance
                d = Math.sqrt(dx * dx + dy * dy);

                // normalize
                nx = dx / d;
                ny = dy / d;

                element.x += nx * d * 0.99;
                element.y += ny * d * 0.99;

                // constrain
                var b;
                if (element.x > 900 || element.x < 0) {
                    b = element.x;
                    element.x = element.x2;
                    element.x2 = b;
                }

                if (element.y > 600 || element.y < 0) {
                    b = element.y;
                    element.y = element.y2;
                    element.y2 = b;
                }

            };


            // apply gravity!
            var force;
            var g = 0.0002;

            for (i = 0; element = APP.world.elements[i]; i++) {
                for (var j = i + 1; element2 = APP.world.elements[j]; j++) {

                    // delta xy
                    dx = element.x - element2.x;
                    dy = element.y - element2.y;

                    // distance
                    d = Math.sqrt(dx * dx + dy * dy);

                    force = g * ((element.mass * element2.mass) / d * d);

                    dx /= d;
                    dy /= d;

                    element.x -= dx * force;
                    element.y -= dy * force;

                    element2.x += dx * force;
                    element2.y += dy * force;

                }
            }


            // fix collisions
            var depth;
            var r2;
            var imass1, imass2;

            for (i = 0; element = APP.world.elements[i]; i++) {
                for (j = i + 1; element2 = APP.world.elements[j]; j++) {

                    // delta xy
                    dx = element.x - element2.x;
                    dy = element.y - element2.y;

                    // distance
                    d = Math.sqrt(dx * dx + dy * dy);
                    r2 = element.radius + element2.radius * 1;

                    if (d < r2) {
                        // move both elements apart by depth.

                        // mass calc.
                        imass1 = 1 / element.mass;
                        imass2 = 1 / element2.mass;

                        depth = d - r2;
                        dx /= d;
                        dy /= d;

                        element.x -= dx * (imass1 / (imass1 + imass2)) * depth;
                        element.y -= dy * (imass1 / (imass1 + imass2)) * depth;

                        element2.x += dx * (imass2 / (imass1 + imass2)) * depth;
                        element2.y += dy * (imass2 / (imass1 + imass2)) * depth;

                    }

                }
            }

        },

        zoomFactor: 1.0,

        render: function (context) {

            var tau = Math.PI * 2;
            var element;
            var i;
            var extremes = APP.world.extremes;

            // setup viewport. get extremes
            for (i = 0; element = APP.world.elements[i]; i++) {
                extremes[0] = Math.min(extremes[0], element.x);
                extremes[1] = Math.min(extremes[1], element.y);
                extremes[2] = Math.min(extremes[2], element.x);
                extremes[3] = Math.min(extremes[3], element.y);
            }


            // batch all drawing for now.
            //   context.globalCompositeOperation = 'xor';

            //   context.strokeStyle = "#000000";
            context.fillStyle = "#000000";
            ///  context.lineWidth = 5;

            //APP.world.zoomFactor -= 

            context.scale(APP.world.zoomFactor, APP.world.zoomFactor);


            for (i = 0; element = APP.world.elements[i]; i++) {
                context.beginPath();

                //   context.fillStyle = element.colour;

                context.moveTo(element.x + element.radius, element.y);
                context.arc(
                    element.x,
                    element.y,
                    element.radius,
                    0,
                    tau,
                    false
                );

                context.fill();
                //    context.stroke();

            }


        }

    }

    APP.core = {
        frame: function () {
            APP.core.setDelta();
            APP.core.update();
            APP.core.render();
            APP.core.animationFrame = window.requestAnimationFrame(APP.core.frame);
        },

        setDelta: function () {
            APP.core.now = Date.now();
            APP.core.delta = (APP.core.now - APP.core.then) / 1000; // seconds since last frame
            APP.core.then = APP.core.now;
        },

        update: function () {

            APP.world.update(APP.core.delta);

        },

        render: function () {

            //  APP.context.fillStyle = "rgba(255,255,255 0.4)";
            //  APP.context.fillRect(0, 0, 900, 600);

            canvas.width = canvas.width;

            APP.world.render(APP.context);

            //  console.log(APP.world.elements[1]);

        }
    };

    return APP;

});