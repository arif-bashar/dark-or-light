var app = new Vue({
    el: '#app',
    data: {
        message: 'Hi',
        bgColor: '',
        textColor: 'white',
        network: brain,
    },
    created: function() {
        this.network = new brain.NeuralNetwork();
        this.network.train([
            { input: {r: 1, g: 1, b: 1}, output: {dark: 1} },
            { input: {r: 1, g: 0, b: 0}, output: {light: 1} },
            { input: {r: 1, g: 0, b: 1}, output: {light: 1} },
            { input: {r: 0, g: 0.16, b: 1}, output: {light: 1} },
            { input: {r: 0, g: 0.94, b: 1}, output: {dark: 1} },
            { input: {r: 0, g: 1, b: 0}, output: {dark: 1} },
            { input: {r: 1, g: 0.95, b: 0}, output: {light: 1} },
            { input: {r: 1, g: 0.65, b: 0.61}, output: {dark: 1} },
            { input: {r: 0.96, g: 0.77, b: 1}, output: {dark: 1} },
            { input: {r: 0.7, g: 1, b: 1}, output: {dark: 1} },
            { input: {r: 0.55, g: 1, b: 0.58}, output: {dark: 1} },
            { input: {r: 0.74, g: 0.73, b: 1}, output: {dark: 1} },
            { input: {r: 0.94, g: 0.45, b: 1}, output: {light: 1} },
            { input: {r: 1, g: 0.61, b: 0.11}, output: {light: 1} },
            { input: {r: 0.98, g: 1, b: 0}, output: {dark: 1} },
            { input: {r: 1, g: 0.92, b: 0}, output: {dark: 1} },
            { input: {r: 1, g: 0.96, b: 0}, output: {dark: 1} },
        ]);
    },
    methods: {
        colorDecider() {
            let rgb = this.getRGB(this.bgColor);
            console.log(rgb);

            let result = brain.likely(rgb, this.network);
            console.log('Expected color outcome based on the background is: ' + result);

            if (result == 'dark')
                this.textColor = 'black';
            else
                this.textColor = 'white';

        },

        getRGB(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.toString().replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });
          
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
                g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
                b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
            } : null;
        }
    } 
})

