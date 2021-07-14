import React, { Component } from 'react';
import { geneData } from '../utils/loadData';
import { OVERALL_WIDTH } from '../utils/chartConstants';
import _ from 'lodash';
import SequenceMap from './SequenceMap';
import ChartLegend from './ChartLegend';

var COLOR_MAP = {
    'A': 1,
    'G': 3,
    'C': 4,
    'U': 5,
    'start-or-stop': 7,
    'true': 0,
    'false': 2
};

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: true,
            sequenceMap: {}
        }
    }

    componentDidMount() {

        const { pfizer, moderna, proteinMap,
            pfizerStartandStop, modernaStartandStop } = geneData,
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

        });


        // Add the start and stop coding regions 
        sequenceMap.moderna = [...(modernaStartandStop[0].split('').map((d) => ({ 'color': 6, 'text': d }))), ...(sequenceMap.moderna), ...(modernaStartandStop[1].split('').map((d) => ({ 'color': 6, 'text': d })))];
        // Add the start and stop coding regions 
        sequenceMap.pfizer = [...(pfizerStartandStop[0].split('').map((d) => ({ 'color': 6, 'text': d }))), ...(sequenceMap.pfizer), ...(pfizerStartandStop[1].split('').map((d) => ({ 'color': 6, 'text': d })))];

        let pfizerCodonList = _.chunk(pfizer.split(''), 3).map((d) => d.join('')),
            modernaCodonList = _.chunk(moderna.split(''), 3).map((d) => d.join(''));

        _.map(pfizerCodonList, (pfizerCodon, codonIndex) => {

            let modernaCodon = modernaCodonList[codonIndex],
                pfizerProtein = proteinMap[pfizerCodon],
                modernaProtein = proteinMap[modernaCodon];

            sequenceMap.pfizerProt.push({
                'color': COLOR_MAP[pfizerProtein == modernaProtein],
                'text': pfizerProtein
            });

            sequenceMap.modernaProt.push({
                'color': COLOR_MAP[pfizerProtein == modernaProtein],
                'text': modernaProtein
            });
        });

        this.setState({ sequenceMap });
    }

    render() {

        const { sequenceMap } = this.state, width = OVERALL_WIDTH;

        const sequenceWidth = width < 500 ? width : width / 2;

        return (
            <div>
                <div className={'dashboard-root batman container-fluid'}>
                    <h4 className='description'>A visualization of the similairity between the spike protein encoding mRNA sequences in the Pfizer and Moderna vaccines.
                        mRNA sequences are made up of 4 nucleotides (A,G,C and U) which are translated into protein sequences.
                        Each set of three nucleotides called a codon encode for one amino acid which when chained together make up a protein sequence. But with 64 feasible combinations(4x4x4, 4 nucleotides) and only 20 possible amino acids, several combinations end up coding for the same amino acid.
                        Thus even though the mRNA sequences differ by about 10% when encoded into amino acids they form an exactly identical protein sequence.</h4>


                    <h3 className='banner'>Moderna and Pfizer vaccine mRNA sequences are 100% indentical when encoded into protein sequences.</h3>
                    <div className='row'>
                        <ChartLegend type='Nucleotide' />
                        <div className='col-sm-6'>
                            {sequenceMap && sequenceMap.pfizer &&
                                <SequenceMap
                                    sequence={sequenceMap.pfizer}
                                    seqID='pfizer'
                                    title={'Pfizer'}
                                    width={sequenceWidth} />}
                        </div>
                        <div className='col-sm-6'>
                            {sequenceMap && sequenceMap.moderna &&
                                <SequenceMap
                                    titleRight={true}
                                    sequence={sequenceMap.moderna}
                                    seqID='moderna'
                                    title={'Moderna'}
                                    width={sequenceWidth} />}
                        </div>
                    </div>

                    <div className='row'>
                        <ChartLegend type='Difference' />
                        <div className='col-sm-6'>
                            {sequenceMap && sequenceMap.moderna &&
                                <SequenceMap
                                    sequence={sequenceMap.pfizerDiff}
                                    seqID='pfizerDiff'
                                    title={'Pfizer'}
                                    width={sequenceWidth} />}
                        </div>
                        <div className='col-sm-6'>
                            {sequenceMap && sequenceMap.moderna &&
                                <SequenceMap
                                    titleRight={true}
                                    sequence={sequenceMap.modernaDiff}
                                    seqID='modernaDiff'
                                    title={'Moderna'}
                                    width={sequenceWidth} />}
                        </div>
                    </div>

                    <div className='row'>
                        <ChartLegend type='Protein' />
                        <div className='col-sm-6'>
                            {sequenceMap && sequenceMap.pfizerProt &&
                                <SequenceMap
                                    sequence={sequenceMap.pfizerProt}
                                    seqID='pfizerProt'
                                    title={'Pfizer'}
                                    width={sequenceWidth} />}
                        </div>
                        <div className='col-sm-6'>
                            {sequenceMap && sequenceMap.modernaProt &&
                                <SequenceMap
                                    titleRight={true}
                                    sequence={sequenceMap.modernaProt}
                                    seqID='modernaProt'
                                    title={'Moderna'}
                                    width={sequenceWidth} />}
                        </div>
                    </div>
                    <h4 className='text-right m-t description strong p-r'>Designed at the <a href='http://hci.usask.ca/'>HCI lab</a>, University of Saskatchewan.</h4>
                    <h4 className='text-right description strong p-r'>Data source -<a href='https://github.com/NAalytics/Assemblies-of-putative-SARS-CoV2-spike-encoding-mRNA-sequences-for-vaccines-BNT-162b2-and-mRNA-1273'>Assemblies-of-putative-SARS-CoV2-spike-encoding-mRNA-sequences (NAalytics GitHub)</a></h4>
                </div>
                <footer className="footer w-full m-t">
                    <div className="container-fluid">
                        <div className='w-md footer-inner'>
                            <span className="left text-xs-left">
                                <a className="footer-link" href="mailto:venkat.bandi@usask.ca?subject=Vaccine Mapping Tool&amp;body=Please%20Fill%20">Contact Us</a>
                            </span>
                        </div>
                        <div className='w-md footer-inner text-xs-right'>
                            <span className='m-r'>
                                Made with <span style={{ "color": '#e25555', 'fontSize': '19px', 'margin': '0px 3px' }}>&hearts;</span> by <a href="https://github.com/kiranbandi">kiranbandi</a></span>
                            <a className="footer-link right" href="http://hci.usask.ca/"> <img src="interaction_lab.gif" height="30" /></a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}




