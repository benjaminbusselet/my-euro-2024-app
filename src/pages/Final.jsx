/* eslint-disable react/prop-types */
import teams from '../components/teams';

const Final = ({ finalResult }) => {
    if (!finalResult) {
        return null;
    }
    return (
        <div>
            <h1>Finale</h1>
            <div>
                <h3>
                    {teams[finalResult.team1]} vs {teams[finalResult.team2]} - Résultat : {finalResult.result === 'A' ? teams[finalResult.team1] : teams[finalResult.team2]}
                </h3>
            </div>
        </div>
    );
};

export default Final;
