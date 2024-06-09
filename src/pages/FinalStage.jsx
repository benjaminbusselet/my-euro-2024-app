import { useContext, useEffect } from 'react';
import { ResultsContext } from '../ResultsContext';
import { getAllGroupPredictions, calculateTeamStats, calculateQualifiedTeams } from '../components/prediction';
import RoundOf16 from './RoundOf16';
import QuarterFinals from './QuarterFinals';
import SemiFinals from './SemiFinals';
import Final from './Final';

const FinalStage = () => {
    const {
        groupPredictions, setGroupPredictions,
        teamStats, setTeamStats,
        qualifiedTeams, setQualifiedTeams,
        roundOf16Results, quarterFinalsResults,
        semiFinalsResults, finalResult
    } = useContext(ResultsContext);

    useEffect(() => {
        if (Object.keys(groupPredictions).length === 0) {
            const predictions = getAllGroupPredictions();
            setGroupPredictions(predictions);
        }
    }, [groupPredictions, setGroupPredictions]);

    useEffect(() => {
        if (Object.keys(groupPredictions).length > 0 && Object.keys(teamStats).length === 0) {
            const stats = calculateTeamStats(groupPredictions);
            setTeamStats(stats);
        }
    }, [groupPredictions, teamStats, setTeamStats]);

    useEffect(() => {
        if (Object.keys(teamStats).length > 0 &&
            (Object.keys(qualifiedTeams.first).length === 0 || Object.keys(qualifiedTeams.second).length === 0 || qualifiedTeams.third.length === 0)) {
            const qualified = calculateQualifiedTeams(teamStats);
            setQualifiedTeams(qualified);
        }
    }, [teamStats, qualifiedTeams, setQualifiedTeams]);

    return (
        <div>
            <RoundOf16 roundOf16Results={roundOf16Results} />
            <QuarterFinals quarterFinalsResults={quarterFinalsResults} />
            <SemiFinals semiFinalsResults={semiFinalsResults} />
            <Final finalResult={finalResult} />
        </div>
    );
};

export default FinalStage;
