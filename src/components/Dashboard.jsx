import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geneData } from '../utils/loadData';
import { COLOR_LIST, LABEL_WIDTH, OVERALL_WIDTH, ZOOM_SCALE } from '../utils/chartConstants';
import { scaleLinear } from 'd3';
import _ from 'lodash';
import SequenceMap from './SequenceMap';

var CHART_WIDTH = 25000;
var TRACK_HEIGHT = 25;
var COLOR_MAP = {
    'A': 1,
    'G': 3,
    'C': 4,
    'U': 5,
    'true': 0,
    'false': 2
};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: true,
            sequenceMap: {}
        }
    }

    componentDidMount() {

        const { pfizer, moderna, proteinMap } = geneData,
            sequenceMap = {
                'pfizer': [],
                'moderna': [],
                'pfizerDiff': [],
                'modernaDiff': [],
                'pfizerProt': [],
                'modernaProt': []
            }

        // Loop over to populate all the sequeces
        _.map(pfizer, (pfizerNuc, nucIndex) => {

            const modernaNuc = moderna[nucIndex];

            // populate pfizer sequence
            sequenceMap.pfizer.push({
                'color': COLOR_MAP[pfizerNuc],
                'text': pfizerNuc
            });

            // populate moderna sequence
            sequenceMap.moderna.push({
                'color': COLOR_MAP[modernaNuc],
                'text': modernaNuc
            });

            // populate color difference 
            sequenceMap.pfizerDiff.push({
                'color': COLOR_MAP[modernaNuc == pfizerNuc],
                'text': pfizerNuc
            });
            sequenceMap.modernaDiff.push({
                'color': COLOR_MAP[modernaNuc == pfizerNuc],
                'text': modernaNuc
            });

            // go forward and combine the current and next two nucleotides into once codon 
            if (nucIndex % 3 == 0) {
                let pfizerCodon = pfizerNuc + pfizer[nucIndex + 1] + pfizer[nucIndex + 2],
                    modernaCodon = modernaNuc + moderna[nucIndex + 1] + moderna[nucIndex + 2];

                sequenceMap.pfizerProt.push({
                    'color': proteinMap[pfizerCodon] == proteinMap[modernaCodon],
                    'text': proteinMap[pfizerCodon]
                });

                sequenceMap.modernaProt.push({
                    'color': proteinMap[pfizerCodon] == proteinMap[modernaCodon],
                    'text': proteinMap[modernaCodon]
                });
            }
        });

        debugger;


        // const markerCount = pfizer.length;

        // let chartScale = scaleLinear()
        //     .domain([0, markerCount - 1])
        //     .range([0, CHART_WIDTH]);


        // let canvas = this['canvas-pfizer'];


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


        // // Draw Moderna
        // canvas = this['canvas-moderna'];
        // context = canvas.getContext('2d');
        // // Store the current transformation matrix
        // context.save();
        // // Use the identity matrix while clearing the canvas
        // context.setTransform(1, 0, 0, 1, 0, 0);
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // // Restore the transform
        // context.restore();

        // context.lineWidth = TRACK_HEIGHT;

        // _.map(moderna, (nuc, lineIndex) => {
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

        // _.map(moderna, (nuc, lineIndex) => {
        //     context.textAlign = "center";
        //     context.textBaseline = "middle";
        //     // Add label for each line
        //     context.beginPath();
        //     context.font = "11px Arial";
        //     context.fillStyle = 'white';
        //     context.fillText(nuc, chartScale(lineIndex) - 2, TRACK_HEIGHT / 2);
        // });


        // // Plot difference 
        // canvas = this['canvas-diff'];
        // context = canvas.getContext('2d');
        // // Store the current transformation matrix
        // context.save();
        // // Use the identity matrix while clearing the canvas
        // context.setTransform(1, 0, 0, 1, 0, 0);
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // // Restore the transform
        // context.restore();

        // context.lineWidth = TRACK_HEIGHT;

        // let c = 0;

        // _.map(moderna, (nuc, lineIndex) => {
        //     context.beginPath();
        //     context.moveTo(Math.round(chartScale(lineIndex)), 0);
        //     context.lineTo(Math.round(chartScale(lineIndex)), TRACK_HEIGHT);

        //     let color;
        //     if (moderna[lineIndex] == pfizer[lineIndex]) {
        //         color = COLOR_LIST[0];
        //     }
        //     else {
        //         c = c + 1;
        //         color = COLOR_LIST[2];
        //     }
        //     context.strokeStyle = color;
        //     context.stroke();
        // });


        // _.map(moderna, (nuc, lineIndex) => {
        //     context.textAlign = "center";
        //     context.textBaseline = "middle";
        //     // Add label for each line
        //     context.beginPath();
        //     context.font = "11px Arial";
        //     context.fillStyle = 'white';

        //     if (moderna[lineIndex] != pfizer[lineIndex]) {
        //         context.fillText(nuc, chartScale(lineIndex) - 2, TRACK_HEIGHT / 2);
        //     }

        // });



        // // Plot Protein
        // // Plot difference 
        // canvas = this['canvas-prot'];
        // context = canvas.getContext('2d');
        // // Store the current transformation matrix
        // context.save();
        // // Use the identity matrix while clearing the canvas
        // context.setTransform(1, 0, 0, 1, 0, 0);
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // // Restore the transform
        // context.restore();

        // context.lineWidth = TRACK_HEIGHT;

        // _.map(moderna, (nuc, lineIndex) => {
        //     context.beginPath();
        //     context.moveTo(Math.round(chartScale(lineIndex)), 0);
        //     context.lineTo(Math.round(chartScale(lineIndex)), TRACK_HEIGHT);
        //     let color = COLOR_LIST[0];;
        //     context.strokeStyle = color;
        //     context.stroke();
        // });

    }

    render() {

        return (
            <div className={'dashboard-root batman'}>

                {/* <SequenceMap /> */}

                {/* <div className='canvas-wrapper m-a'>
                    <h3>Pfizer mRNA Sequence</h3>
                    <canvas className='genomemap-canvas'
                        width={CHART_WIDTH}
                        height={TRACK_HEIGHT}
                        ref={(el) => { this['canvas-pfizer'] = el }} />

                    <h3>Moderna mRNA Sequence</h3>
                    <canvas className='genomemap-canvas'
                        width={CHART_WIDTH}
                        height={TRACK_HEIGHT}
                        ref={(el) => { this['canvas-moderna'] = el }} />

                    <h3>Difference Mapping mRNA</h3>
                    <canvas className='genomemap-canvas'
                        width={CHART_WIDTH}
                        height={TRACK_HEIGHT}
                        ref={(el) => { this['canvas-diff'] = el }} />


                    <h3>Difference Mapping Protein</h3>
                    <canvas className='genomemap-canvas m-b'
                        width={CHART_WIDTH}
                        height={TRACK_HEIGHT}
                        ref={(el) => { this['canvas-prot'] = el }} /> 

            </div>*/}

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);




