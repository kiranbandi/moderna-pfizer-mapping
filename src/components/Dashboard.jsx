import React, { Component } from 'react';
import { geneData } from '../utils/loadData';
import { OVERALL_WIDTH } from '../utils/chartConstants';
import _ from 'lodash';
import SequenceMap from './SequenceMap';

var COLOR_MAP = {
    'A': 1,
    'G': 3,
    'C': 4,
    'U': 5,
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

        });

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
            <div className={'dashboard-root batman container-fluid'}>
                <h4 className='description'>A visualization of the similairity between the spike protein encoding mRNA sequence in the Pfizer and Moderna vaccines.
                    mRNA sequences are made up of 4 nucleotides (A,G,C and U) which are translated into protein sequences.
                    Each set of three nucleotides called a codon correspond to one amino acid. But with 64 feasible combinations(4x4x4) and only 20 possible amino acids, several combinations end up coding for the same amino acid.
                    Thus even though the mRNA sequences differ by about 10% when encoded into amino acids they form an exactly identical protein sequence.</h4>
                <h4 className='description'> <b>Designed and developed at the HCI lab, University of Saskatchewan.</b> <a className='text-info' href='https://github.com/NAalytics/Assemblies-of-putative-SARS-CoV2-spike-encoding-mRNA-sequences-for-vaccines-BNT-162b2-and-mRNA-1273'>Data source Link</a></h4>
                <div className='row'>
                    <div className='col-sm-6'>
                        {sequenceMap && sequenceMap.pfizer &&
                            <SequenceMap
                                sequence={sequenceMap.pfizer}
                                seqID='pfizer'
                                title={'Pfizer mRNA (protein encoding region)'}
                                width={sequenceWidth} />}
                    </div>
                    <div className='col-sm-6'>
                        {sequenceMap && sequenceMap.moderna &&
                            <SequenceMap
                                sequence={sequenceMap.moderna}
                                seqID='moderna'
                                title={'Moderna mRNA (protein encoding region)'}
                                width={sequenceWidth} />}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-6'>
                        {sequenceMap && sequenceMap.moderna &&
                            <SequenceMap
                                sequence={sequenceMap.pfizerDiff}
                                seqID='pfizerDiff'
                                title={'Pfizer difference from Moderna'}
                                width={sequenceWidth} />}
                    </div>
                    <div className='col-sm-6'>
                        {sequenceMap && sequenceMap.moderna &&
                            <SequenceMap
                                sequence={sequenceMap.modernaDiff}
                                seqID='modernaDiff'
                                title={'Moderna difference from Pfizer'}
                                width={sequenceWidth} />}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-6'>
                        {sequenceMap && sequenceMap.pfizerProt &&
                            <SequenceMap
                                sequence={sequenceMap.pfizerProt}
                                seqID='pfizerProt'
                                title={'Pfizer mRNA translated into Protein'}
                                width={sequenceWidth} />}
                    </div>
                    <div className='col-sm-6'>
                        {sequenceMap && sequenceMap.modernaProt &&
                            <SequenceMap
                                sequence={sequenceMap.modernaProt}
                                seqID='modernaProt'
                                title={'Moderna mRNA translated into Protein'}
                                width={sequenceWidth} />}
                    </div>
                </div>
            </div>
        );
    }
}




