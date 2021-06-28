import React, { Component } from 'react';
import { COLOR_LIST, LABEL_WIDTH, OVERALL_WIDTH, ZOOM_SCALE } from '../utils/chartConstants';
import { scaleLinear } from 'd3';
import _ from 'lodash';

var CHART_WIDTH = 25000;
var TRACK_HEIGHT = 25;

export default class SequenceMap extends Component {

    componentDidMount() {

        const { sequence, width, seqID } = this.props, sequenceLength = sequence.length;

        // let chartScale = scaleLinear()
        //     .domain([0, sequenceLength - 1])
        //     .range([0, width]);

        // let canvas = this['canvas-' + seqID];

        // let context = canvas.getContext('2d');
        // // Store the current transformation matrix
        // context.save();
        // // Use the identity matrix while clearing the canvas
        // context.setTransform(1, 0, 0, 1, 0, 0);
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // // Restore the transform
        // context.restore();

        // context.lineWidth = TRACK_HEIGHT;

        // _.map(pfizer, (nuc, lineIndex) => {
        //     context.beginPath();
        //     context.moveTo(Math.round(chartScale(lineIndex)), 0);
        //     context.lineTo(Math.round(chartScale(lineIndex)), TRACK_HEIGHT);

        //     let color = COLOR_LIST[1];
        //     if (nuc == 'G') {
        //         color = COLOR_LIST[2];
        //     }
        //     else if (nuc == 'C') {
        //         color = COLOR_LIST[3];
        //     }
        //     else if (nuc == 'U') {
        //         color = COLOR_LIST[4];
        //     }
        //     context.strokeStyle = color;
        //     context.stroke();
        // });

        // _.map(pfizer, (nuc, lineIndex) => {
        //     context.textAlign = "center";
        //     context.textBaseline = "middle";
        //     // Add label for each line
        //     context.beginPath();
        //     context.font = "11px Arial";
        //     context.fillStyle = 'white';
        //     context.fillText(nuc, chartScale(lineIndex) - 2, TRACK_HEIGHT / 2);
        // });

    }

    render() {

        const { sequence, seqID, title, width } = this.props,
            // Width of each character in pixels
            characterWidth = 15,
            sequenceParts = (sequence.length * characterWidth) / width;

        return (
            <div className='canvas-wrapper m-a'>
                <h3>{title}</h3>
                {_.times(sequenceParts, (d, i) => {
                    return <canvas className='sequence-canvas'
                        width={width}
                        height={TRACK_HEIGHT}
                        ref={(el) => { this['canvas-' + seqID + '-' + i] = el }} />
                })}
            </div>
        );
    }
}




