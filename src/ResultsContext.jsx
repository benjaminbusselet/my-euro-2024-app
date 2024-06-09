import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calculateTeamStats, calculateQualifiedTeams, simulateFinalStageMatch, roundOf16Matches, quarterFinalsMatches, semiFinalsMatches, finalMatch } from './components/prediction';

const ResultsContext = createContext();

const ResultsProvider = ({ children }) => {
    const [groupPredictions, setGroupPredictions] = useState({});
    const [teamStats, setTeamStats] = useState({});
    const [qualifiedTeams, setQualifiedTeams] = useState({ first: {}, second: {}, third: [] });
    const [roundOf16Results, setRoundOf16Results] = useState([]);
    const [quarterFinalsResults, setQuarterFinalsResults] = useState([]);
    const [semiFinalsResults, setSemiFinalsResults] = useState([]);
    const [finalResult, setFinalResult] = useState(null);

    useEffect(() => {
        if (Object.keys(groupPredictions).length > 0) {
            const stats = calculateTeamStats(groupPredictions);
            setTeamStats(stats);
        }
    }, [groupPredictions]);

    useEffect(() => {
        if (Object.keys(teamStats).length > 0) {
            const qualified = calculateQualifiedTeams(teamStats);
            setQualifiedTeams(qualified);
        }
    }, [teamStats]);

    useEffect(() => {
        if (Object.keys(qualifiedTeams.first).length > 0 && Object.keys(qualifiedTeams.second).length > 0 && qualifiedTeams.third.length > 0) {
            const results = roundOf16Matches.map(match => {
                const team1 = getTeamId(qualifiedTeams, match.team1);
                const team2 = getTeamId(qualifiedTeams, match.team2);
                if (!team1 || !team2) {
                    console.error(`Team not found for match ${match.match}: ${match.team1} vs ${match.team2}`);
                    return null;
                }
                const result = simulateFinalStageMatch(team1, team2, teamStats);
                return { ...match, team1, team2, result };
            }).filter(match => match !== null);
            setRoundOf16Results(results);
        }
    }, [qualifiedTeams, teamStats]);

    useEffect(() => {
        if (roundOf16Results.length > 0) {
            const winners = roundOf16Results.reduce((acc, match) => {
                acc[`winner${match.match}`] = match.result === 'A' ? match.team1 : match.team2;
                return acc;
            }, {});

            const results = quarterFinalsMatches.map(match => {
                const team1 = winners[match.team1];
                const team2 = winners[match.team2];
                if (!team1 || !team2) {
                    console.error(`Team not found for quarter-final match ${match.match}: ${match.team1} vs ${match.team2}`);
                    return null;
                }
                const result = simulateFinalStageMatch(team1, team2, teamStats);
                return { ...match, team1, team2, result };
            }).filter(match => match !== null);
            setQuarterFinalsResults(results);
        }
    }, [roundOf16Results, teamStats]);

    useEffect(() => {
        if (quarterFinalsResults.length > 0) {
            const winners = quarterFinalsResults.reduce((acc, match) => {
                acc[`winner${match.match}`] = match.result === 'A' ? match.team1 : match.team2;
                return acc;
            }, {});

            const results = semiFinalsMatches.map(match => {
                const team1 = winners[match.team1];
                const team2 = winners[match.team2];
                if (!team1 || !team2) {
                    console.error(`Team not found for semi-final match ${match.match}: ${match.team1} vs ${match.team2}`);
                    return null;
                }
                const result = simulateFinalStageMatch(team1, team2, teamStats);
                return { ...match, team1, team2, result };
            }).filter(match => match !== null);
            setSemiFinalsResults(results);
        }
    }, [quarterFinalsResults, teamStats]);

    useEffect(() => {
        if (semiFinalsResults.length > 0) {
            const winners = semiFinalsResults.reduce((acc, match) => {
                acc[`winner${match.match}`] = match.result === 'A' ? match.team1 : match.team2;
                return acc;
            }, {});

            const result = finalMatch.map(match => {
                const team1 = winners[match.team1];
                const team2 = winners[match.team2];
                if (!team1 || !team2) {
                    console.error(`Team not found for final match ${match.match}: ${match.team1} vs ${match.team2}`);
                    return null;
                }
                const result = simulateFinalStageMatch(team1, team2, teamStats);
                return { ...match, team1, team2, result };
            }).filter(match => match !== null);

            setFinalResult(result[0]);
        }
    }, [semiFinalsResults, teamStats]);

    const getTeamId = (qualifiedTeams, position) => {
        if (position.startsWith('first')) {
            const group = position.slice(5);
            return qualifiedTeams.first[group];
        }
        if (position.startsWith('second')) {
            const group = position.slice(6);
            return qualifiedTeams.second[group];
        }
        if (position.startsWith('third')) {
            const index = parseInt(position.slice(5), 10) - 1;
            return qualifiedTeams.third[index];
        }
        console.error(`Invalid position: ${position}`);
        return null;
    };

    return (
        <ResultsContext.Provider value={{
            groupPredictions, setGroupPredictions, teamStats, setTeamStats,
            qualifiedTeams, setQualifiedTeams, roundOf16Results, setRoundOf16Results,
            quarterFinalsResults, setQuarterFinalsResults, semiFinalsResults,
            setSemiFinalsResults, finalResult, setFinalResult
        }}>
            {children}
        </ResultsContext.Provider>
    );
};

ResultsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ResultsContext, ResultsProvider };
