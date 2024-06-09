/* eslint-disable react/prop-types */
import teams from '../components/teams';

const SemiFinals = ({ semiFinalsResults }) => {
    return (
        <div>
            <h1>Demi-finales</h1>
            {semiFinalsResults.map((match, index) => (
                <div key={index}>
                    <h3>
                        {teams[match.team1]} vs {teams[match.team2]} - Résultat : {match.result === 'A' ? teams[match.team1] : teams[match.team2]}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default SemiFinals;
