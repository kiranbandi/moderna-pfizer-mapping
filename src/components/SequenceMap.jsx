import React, { Component } from 'react';
import { COLOR_LIST, TRACK_HEIGHT, CHARACTER_WIDTH } from '../utils/chartConstants';
import { scaleLinear } from 'd3';
import _ from 'lodash';

export default class SequenceMap extends Component {

    componentDidMount() {

        const { sequence, width, seqID } = this.props,
            charactersPerSeq = Math.ceil(width / CHARACTER_WIDTH);

        // Split the sequence into N parts based on width in which content can be fit
        const sequencesList = _.chunk(sequence, charactersPerSeq);

        // Create generic scale reused by all canvases
        let chartScale = scaleLinear()
            .domain([0, charactersPerSeq - 1])
            .range([10, width - 10]);

        _.map(sequencesList, (sequencePart, sequencePartID) => {

            // Clear canvas first
            let canvas = this['canvas-' + seqID + '-' + sequencePartID];
            let context = canvas.getContext('2d');
            // Store the current transformation matrix
            context.save();
            // Use the identity matrix while clearing the canvas
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Restore the transform
            context.restore();
            // Set a fixed linewidth
            context.lineWidth = CHARACTER_WIDTH;

            _.map(sequencePart, (d, nucIndex) => {
                context.beginPath();
                context.moveTo(Math.round(chartScale(nucIndex)), 0);
                context.lineTo(Math.round(chartScale(nucIndex)), TRACK_HEIGHT);
                context.strokeStyle = COLOR_LIST[d.color];
                context.stroke();
            });

            _.map(sequencePart, (d, nucIndex) => {
                context.textAlign = "center";
                context.textBaseline = "middle";
                // Add label for each line
                context.beginPath();
                context.font = "11px Arial";
                context.fillStyle = 'white';
                context.fillText(d.text, chartScale(nucIndex), TRACK_HEIGHT / 2);
            });
        });
    }

    render() {

        const { sequence, seqID, title, width, titleRight = false } = this.props,
            sequenceParts = Math.ceil((sequence.length * CHARACTER_WIDTH) / width);

        return (
            <div className='canvas-wrapper'>
                <h4 style={{ 'width': width }}
                    className={titleRight ? 'text-right' : 'text-left'}>{title}</h4>
                {_.map(_.times(sequenceParts), (d, i) => {
                    return <canvas className='sequence-canvas'
                        key={'key-' + seqID + '-' + i}
                        width={width}
                        height={TRACK_HEIGHT}
                        ref={(el) => { this['canvas-' + seqID + '-' + i] = el }} />
                })}
            </div>
        );
    }
}




