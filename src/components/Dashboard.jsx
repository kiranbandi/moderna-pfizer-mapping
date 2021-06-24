import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geneData } from '../utils/loadData';
import { TRACK_HEIGHT, LABEL_WIDTH, OVERALL_WIDTH, CHART_WIDTH, ZOOM_SCALE } from '../utils/chartConstants';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: true
        }
    }

    componentDidMount() {

        const { pfizer, moderna, proteinMap } = geneData;

        // plot DNA

        // Plot mRNA

        // Plot Protein


    }

    render() {


        return (
            <div className={'dashboard-root batman'}>
                <canvas className='genomemap-canvas'
                    width={CHART_WIDTH}
                    height={TRACK_HEIGHT}
                    ref={(el) => { this['canvas-first'] = el }} />
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




