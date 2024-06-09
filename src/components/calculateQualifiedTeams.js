const calculateQualifiedTeams = (teamStats) => {
    const qualifiedTeams = {
        first: {},
        second: {},
        third: []
    };

    Object.keys(teamStats).forEach(group => {
        const teams = Object.keys(teamStats[group])
            .map(teamId => ({
                teamId,
                ...teamStats[group][teamId]
            }))
            .sort((a, b) => {
                const pointsDiff = b.points - a.points;
                if (pointsDiff !== 0) return pointsDiff;
                return b.coefficient - a.coefficient;
            });

        qualifiedTeams.first[group] = teams[0].teamId;
        qualifiedTeams.second[group] = teams[1].teamId;
        qualifiedTeams.third.push(teams[2].teamId);
    });

    qualifiedTeams.third.sort((a, b) => {
        const pointsDiff = b.points - a.points;
        if (pointsDiff !== 0) return pointsDiff;
        return b.coefficient - a.coefficient;
    });

    qualifiedTeams.third = qualifiedTeams.third.slice(0, 4);

    return qualifiedTeams;
};

export default calculateQualifiedTeams;
