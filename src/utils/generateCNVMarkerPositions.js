import { TRACK_HEIGHT } from './chartConstants';

function seekGenomeCoords(genomeMap, chartScale, genePoint, yIndex) {
    // typecast to numbers
    let cnvIndex = 0,
        cnvWidth,
        cnvMidPoint = +genePoint.mid,
        genomeWidth = (+genomeMap.end) - (+genomeMap.start);
    // check only if the genomic position is valid
    if (cnvMidPoint >= genomeMap.start && cnvMidPoint <= genomeMap.end) {
        cnvIndex = _.findIndex(genomeMap.referenceMap, (d) => +d.position >= cnvMidPoint) || 0;
        cnvWidth = ((+genePoint.end) - (+genePoint.start)) / genomeWidth;
        // The width of the CNV is calculated by scaling to the size 
        // of the genome region in view 
        return {
            'inside': true,
            ...genePoint,
            'y': (yIndex * TRACK_HEIGHT) + 10,
            'x': Math.round(chartScale(cnvIndex)),
            'dx': Math.round(cnvWidth * chartScale.range()[1])
        };
    } else { return { 'inside': false } }
}

export default function(cnvMap, lineNames, genomeMap, chartScale) {
    // // transform genomic coordinates to chart scale markers and create list 
    let markerPositions = _.reduce(lineNames, (acc, line, lineIndex) => {
        // For each line get the CNV markers in it then for each set the
        return acc.concat(_.map(cnvMap[line],
            (d) => seekGenomeCoords(genomeMap, chartScale, d, lineIndex)))
    }, []);
    // return only the points in the given genomic range and group them by type
    return _.groupBy(_.filter(markerPositions, (c) => c.inside), (cnv) => cnv.type);
}