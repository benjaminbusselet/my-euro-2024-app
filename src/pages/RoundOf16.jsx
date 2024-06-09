/* eslint-disable react/prop-types */
import teams from '../components/teams';

const RoundOf16 = ({ roundOf16Results }) => {
    return (
        <div>
            <h1>Huitièmes de finale</h1>
            {roundOf16Results.map((match, index) => (
                <div key={index}>
                    <h3>
                        {teams[match.team1]} vs {teams[match.team2]} - Résultat : {match.result === 'A' ? teams[match.team1] : teams[match.team2]}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default RoundOf16;
