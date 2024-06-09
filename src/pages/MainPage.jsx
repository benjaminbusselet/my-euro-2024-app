import { useContext, useEffect } from 'react';
import { ResultsContext } from '../ResultsContext';
import { calculateTeamStats, groupTeams, getAllGroupPredictions, calculateQualifiedTeams } from '../components/prediction';
import GroupPredictions from './GroupPredictions';

const MainPage = () => {
    const { groupPredictions, setGroupPredictions, teamStats, setTeamStats, setQualifiedTeams } = useContext(ResultsContext);

    useEffect(() => {
        const predictions = getAllGroupPredictions();
        setGroupPredictions(predictions);
        const stats = calculateTeamStats(predictions);
        setTeamStats(stats);
    }, [setGroupPredictions, setTeamStats]);

    useEffect(() => {
        if (Object.keys(teamStats).length > 0) {
            const qualified = calculateQualifiedTeams(teamStats);
            setQualifiedTeams(qualified);
        }
    }, [teamStats, setQualifiedTeams]);

    return (
        <div>
            <GroupPredictions groupPredictions={groupPredictions} teamStats={teamStats} groupTeams={groupTeams} />
        </div>
    );
};

export default MainPage;
