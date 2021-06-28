import { schemeTableau10, schemeCategory10, scaleLog } from 'd3';
// Force page reload when window is resized as
// chart widths are dependant on window width
window.onresize = function () { location.reload() }
// we account a 0.05% for white space around the charts
const OVERALL_WIDTH = window.innerWidth * 0.95;

module.exports = {
    'COLOR_LIST': [...schemeTableau10],
    'TRACK_HEIGHT': 15,
    'CHARACTER_WIDTH': 10,
    OVERALL_WIDTH
};