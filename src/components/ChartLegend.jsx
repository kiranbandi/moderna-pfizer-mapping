import React, { Component } from 'react';
import _ from 'lodash';
import { COLOR_LIST } from '../utils/chartConstants';

export default class ChartLegend extends Component {

    render() {

        if (this.props.type == 'Nucleotide') {
            return (
                <div style={{ 'marginBottom': -35 }} className='legend-wrapper text-center xs-d-block'>
                    <span className='text-primary main-label'>mRNA (CDS) Protein coding regions in both vaccines (colored by nucleotide)</span>
                    {[{ 'color': '1', 'text': 'Adenine (A)' },
                    { 'color': '3', 'text': 'Guanine (G)' },
                    { 'color': '4', 'text': 'Cytosine (C)' },
                    { 'color': '5', 'text': 'Uracil (U)' },
                    { 'color': '6', 'text': 'Start/Stop Codons' }]
                        .map((d) => {
                            return <span key={'color-key-' + d.color} className='legend-box'>
                                <span className='color-box' style={{ 'backgroundColor': COLOR_LIST[d.color] }}></span>
                                <span className='color-legend'>{d.text}</span>
                            </span>
                        })}
                </div>
            );
        }

        else if (this.props.type == 'Difference') {
            return (
                <div style={{ 'marginBottom': -35, 'marginTop': 10 }} className='legend-wrapper text-center xs-d-block'>
                    <span className='text-primary main-label'> ~10% Difference in Nucleotides between both (colored by difference)</span>
                    {[{ 'color': '0', 'text': 'Nucleotides Match' },
                    { 'color': '2', 'text': 'Nucleotides are Different' }]
                        .map((d) => {
                            return <span key={'color-key-' + d.color} className='legend-box'>
                                <span className='color-box' style={{ 'backgroundColor': COLOR_LIST[d.color] }}></span>
                                <span className='color-legend'>{d.text}</span>
                            </span>
                        })}
                </div>
            );
        }

        else {
            return (
                <div style={{ 'marginBottom': -35, 'marginTop': 10 }} className='legend-wrapper text-center'>
                    <span className='text-primary main-label'> 100% identical when mRNA is translated into Protein (colored by difference)</span>
                    {[{ 'color': '0', 'text': 'Amino acids same' },
                    { 'color': '2', 'text': 'Amino acids are different' }]
                        .map((d) => {
                            return <span key={'color-key-' + d.color} className='legend-box'>
                                <span className='color-box' style={{ 'backgroundColor': COLOR_LIST[d.color] }}></span>
                                <span className='color-legend'>{d.text}</span>
                            </span>
                        })}
                </div>
            );
        }


    }
}




