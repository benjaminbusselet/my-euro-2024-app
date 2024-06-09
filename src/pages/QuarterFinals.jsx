/* eslint-disable react/prop-types */
import teams from '../components/teams';

const QuarterFinals = ({ quarterFinalsResults }) => {
    return (
        <div>
            <h1>Quarts de finale</h1>
            {quarterFinalsResults.map((match, index) => (
                <div key={index}>
                    <h3>
                        {teams[match.team1]} vs {teams[match.team2]} - Résultat : {match.result === 'A' ? teams[match.team1] : teams[match.team2]}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default QuarterFinals;
