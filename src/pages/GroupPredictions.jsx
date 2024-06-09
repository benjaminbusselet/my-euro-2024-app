/* eslint-disable react/prop-types */
import teams from '../components/teams';
import './GroupPredictions.css';

const GroupPredictions = ({ groupPredictions, teamStats, groupTeams }) => {
    return (
        <div className="groups-container">
            {Object.keys(groupPredictions).map(group => (
                <div key={group} className="group">
                    <h2>Groupe {group}</h2>
                    {groupPredictions[group].map((match, index) => (
                        <div key={index}>
                            <h3>
                                {teams[match.teamA]} vs {teams[match.teamB]} :{' '}
                                {match.result === 'A' ? teams[match.teamA] : match.result === 'B' ? teams[match.teamB] : 'Match nul'}
                            </h3>
                        </div>
                    ))}
                    <table>
                        <thead>
                            <tr>
                                <th>Équipe</th>
                                <th>Victoires</th>
                                <th>Nuls</th>
                                <th>Défaites</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupTeams[group]
                                .sort((a, b) => {
                                    const pointsDiff = teamStats[group][b].points - teamStats[group][a].points;
                                    if (pointsDiff !== 0) return pointsDiff;
                                    return teamStats[group][b].coefficient - teamStats[group][a].coefficient;
                                })
                                .map(teamId => (
                                    <tr key={teamId}>
                                        <td>{teams[teamId]}</td>
                                        <td>{teamStats[group][teamId].wins}</td>
                                        <td>{teamStats[group][teamId].draws}</td>
                                        <td>{teamStats[group][teamId].losses}</td>
                                        <td>{teamStats[group][teamId].points}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default GroupPredictions;
