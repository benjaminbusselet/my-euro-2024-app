const calculatePoints = (results) => {
    return results.reduce((acc, result) => acc + result, 0);
};

const calculateCoefficient = (results, fifaIndex) => {
    const recentFormPoints = calculatePoints(results);
    const adjustedFifaIndex = (200 - fifaIndex) / 200; // Normalisation de l'indice FIFA
    return recentFormPoints * adjustedFifaIndex;
};

const randomNormalPerturbation = (mean = 0, stdDev = 0.05) => {
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

const simulateMatch = (teamACoefficient, teamBCoefficient, simulations = 1000) => {
    let teamAWins = 0;
    let teamBWins = 0;
    let draws = 0;
    const tolerance = 1.0;

    for (let i = 0; i < simulations; i++) {
        const perturbedTeamACoefficient = teamACoefficient + randomNormalPerturbation();
        const perturbedTeamBCoefficient = teamBCoefficient + randomNormalPerturbation();

        if (Math.abs(perturbedTeamACoefficient - perturbedTeamBCoefficient) < tolerance) {
            draws++;
        } else if (perturbedTeamACoefficient > perturbedTeamBCoefficient) {
            teamAWins++;
        } else {
            teamBWins++;
        }
    }

    return { teamAWins, teamBWins, draws };
};

const predictMatchResult = (teamACoefficient, teamBCoefficient) => {
    const { teamAWins, teamBWins, draws } = simulateMatch(teamACoefficient, teamBCoefficient);

    if (teamAWins > teamBWins && teamAWins > draws) {
        return 'A';
    } else if (teamBWins > teamAWins && teamBWins > draws) {
        return 'B';
    } else {
        return 'Draw';
    }
};

const groupTeams = {
    "A": [1, 2, 3, 4],
    "B": [5, 6, 7, 8],
    "C": [9, 10, 11, 12],
    "D": [13, 14, 15, 16],
    "E": [17, 18, 19, 20],
    "F": [21, 22, 23, 24]
};

const groupsData = {
    "A": {
        1: { results: [3, 1, 3, 3, 3], fifaIndex: 15 },
        2: { results: [3, 0, 0, 3, 3], fifaIndex: 44 },
        3: { results: [0, 1, 3, 1, 3], fifaIndex: 40 },
        4: { results: [1, 3, 3, 1, 3], fifaIndex: 13 }
    },
    "B": {
        5: { results: [3, 3, 1, 3, 3], fifaIndex: 8 },
        6: { results: [3, 3, 3, 3, 3], fifaIndex: 6 },
        7: { results: [3, 1, 3, 3, 3], fifaIndex: 10 },
        8: { results: [3, 0, 0, 3, 1], fifaIndex: 66 }
    },
    "C": {
        9: { results: [3, 1, 3, 3, 1], fifaIndex: 64 },
        10: { results: [3, 3, 1, 3, 3], fifaIndex: 18 },
        11: { results: [1, 3, 3, 1, 3], fifaIndex: 29 },
        12: { results: [3, 3, 3, 3, 3], fifaIndex: 4 }
    },
    "D": {
        13: { results: [3, 3, 1, 1, 3], fifaIndex: 21 },
        14: { results: [3, 3, 3, 1, 3], fifaIndex: 7 },
        15: { results: [3, 3, 1, 3, 3], fifaIndex: 23 },
        16: { results: [3, 3, 3, 3, 3], fifaIndex: 2 }
    },
    "E": {
        17: { results: [3, 3, 1, 3, 3], fifaIndex: 5 },
        18: { results: [1, 1, 3, 3, 3], fifaIndex: 51 },
        19: { results: [3, 3, 1, 1, 3], fifaIndex: 39 },
        20: { results: [3, 3, 1, 3, 1], fifaIndex: 24 }
    },
    "F": {
        21: { results: [3, 3, 3, 1, 0], fifaIndex: 43 },
        22: { results: [3, 1, 3, 3, 3], fifaIndex: 78 },
        23: { results: [3, 3, 3, 3, 3], fifaIndex: 9 },
        24: { results: [3, 1, 3, 3, 3], fifaIndex: 37 }
    }
};

const groupMatches = [
    { date: '14 juin', match: 'Allemagne – Ecosse', teamA: 1, teamB: 2 },
    { date: '15 juin', match: 'Espagne – Croatie', teamA: 5, teamB: 6 },
    { date: '15 juin', match: 'Italie – Albanie', teamA: 7, teamB: 8 },
    { date: '15 juin', match: 'Hongrie – Suisse', teamA: 3, teamB: 4 },
    { date: '16 juin', match: 'Serbie – Angleterre', teamA: 11, teamB: 12 },
    { date: '16 juin', match: 'Pologne – Pays-Bas', teamA: 13, teamB: 14 },
    { date: '16 juin', match: 'Slovénie – Danemark', teamA: 9, teamB: 10 },
    { date: '17 juin', match: 'Autriche – France', teamA: 15, teamB: 16 },
    { date: '17 juin', match: 'Belgique – Slovaquie', teamA: 17, teamB: 18 },
    { date: '17 juin', match: 'Roumanie – Ukraine', teamA: 19, teamB: 20 },
    { date: '18 juin', match: 'Portugal – Rép.Tchèque', teamA: 23, teamB: 24 },
    { date: '18 juin', match: 'Turquie – Géorgie', teamA: 21, teamB: 22 },
    { date: '19 juin', match: 'Croatie – Albanie', teamA: 6, teamB: 8 },
    { date: '19 juin', match: 'Ecosse – Suisse', teamA: 2, teamB: 4 },
    { date: '19 juin', match: 'Allemagne – Hongrie', teamA: 1, teamB: 3 },
    { date: '20 juin', match: 'Espagne – Italie', teamA: 5, teamB: 7 },
    { date: '20 juin', match: 'Danemark – Angleterre', teamA: 10, teamB: 12 },
    { date: '20 juin', match: 'Slovénie – Serbie', teamA: 9, teamB: 11 },
    { date: '21 juin', match: 'Pologne – Autriche', teamA: 13, teamB: 15 },
    { date: '21 juin', match: 'Pays-Bas – France', teamA: 14, teamB: 16 },
    { date: '21 juin', match: 'Slovaquie – Ukraine', teamA: 18, teamB: 20 },
    { date: '22 juin', match: 'Géorgie – Rép.Tchèque', teamA: 22, teamB: 24 },
    { date: '22 juin', match: 'Turquie – Portugal', teamA: 21, teamB: 23 },
    { date: '22 juin', match: 'Belgique – Roumanie', teamA: 17, teamB: 19 },
    { date: '23 juin', match: 'Suisse – Allemagne', teamA: 4, teamB: 1 },
    { date: '23 juin', match: 'Ecosse – Hongrie', teamA: 2, teamB: 3 },
    { date: '24 juin', match: 'Croatie – Italie', teamA: 6, teamB: 7 },
    { date: '24 juin', match: 'Albanie – Espagne', teamA: 8, teamB: 5 },
    { date: '25 juin', match: 'Pays-Bas – Autriche', teamA: 14, teamB: 15 },
    { date: '25 juin', match: 'France – Pologne', teamA: 16, teamB: 13 },
    { date: '25 juin', match: 'Angleterre – Slovénie', teamA: 12, teamB: 9 },
    { date: '25 juin', match: 'Danemark – Serbie', teamA: 10, teamB: 11 },
    { date: '26 juin', match: 'Slovaquie – Roumanie', teamA: 18, teamB: 19 },
    { date: '26 juin', match: 'Ukraine – Belgique', teamA: 20, teamB: 17 },
    { date: '26 juin', match: 'Rép.Tchèque – Turquie', teamA: 24, teamB: 21 },
    { date: '26 juin', match: 'Géorgie – Portugal', teamA: 22, teamB: 23 }
];

const roundOf16Matches = [
    { match: 37, team1: 'firstA', team2: 'secondC' },
    { match: 38, team1: 'secondA', team2: 'secondB' },
    { match: 39, team1: 'firstB', team2: 'third1' },
    { match: 40, team1: 'firstC', team2: 'third4' },
    { match: 41, team1: 'firstF', team2: 'third3' },
    { match: 42, team1: 'secondD', team2: 'secondE' },
    { match: 43, team1: 'firstE', team2: 'third2' },
    { match: 44, team1: 'firstD', team2: 'secondF' }
];

const quarterFinalsMatches = [
    { match: 45, team1: 'winner39', team2: 'winner37' },
    { match: 46, team1: 'winner41', team2: 'winner42' },
    { match: 47, team1: 'winner43', team2: 'winner44' },
    { match: 48, team1: 'winner40', team2: 'winner38' }
];

const semiFinalsMatches = [
    { match: 49, team1: 'winner45', team2: 'winner46' },
    { match: 50, team1: 'winner47', team2: 'winner48' }
];

const finalMatch = [
    { match: 51, team1: 'winner49', team2: 'winner50' }
];

const calculateTeamStats = (groupPredictions) => {
    const stats = {};

    Object.keys(groupPredictions).forEach(group => {
        stats[group] = {};

        groupTeams[group].forEach(teamId => {
            stats[group][teamId] = {
                wins: 0,
                draws: 0,
                losses: 0,
                points: 0,
                coefficient: 0
            };
        });

        groupPredictions[group].forEach(match => {
            const { teamA, teamB, result } = match;

            if (result === 'A') {
                stats[group][teamA].wins++;
                stats[group][teamA].points += 3;
                stats[group][teamB].losses++;
            } else if (result === 'B') {
                stats[group][teamB].wins++;
                stats[group][teamB].points += 3;
                stats[group][teamA].losses++;
            } else {
                stats[group][teamA].draws++;
                stats[group][teamB].draws++;
                stats[group][teamA].points++;
                stats[group][teamB].points++;
            }
        });

        groupTeams[group].forEach(teamId => {
            const teamResults = groupsData[group][teamId].results;
            const teamFifaIndex = groupsData[group][teamId].fifaIndex;
            stats[group][teamId].coefficient = calculateCoefficient(teamResults, teamFifaIndex);
        });
    });

    return stats;
};

const getAllGroupPredictions = () => {
    const allPredictions = {};
    groupMatches.forEach(({ date, match, teamA, teamB }) => {
        const group = Object.keys(groupTeams).find(g =>
            groupTeams[g].includes(teamA) && groupTeams[g].includes(teamB)
        );

        if (!allPredictions[group]) {
            allPredictions[group] = [];
        }

        const teamACoefficient = calculateCoefficient(groupsData[group][teamA].results, groupsData[group][teamA].fifaIndex);
        const teamBCoefficient = calculateCoefficient(groupsData[group][teamB].results, groupsData[group][teamB].fifaIndex);
        const result = predictMatchResult(teamACoefficient, teamBCoefficient);

        allPredictions[group].push({ teamA, teamB, result, date, match });
    });
    return allPredictions;
};

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
        qualifiedTeams.third.push(teams[2]);
    });

    qualifiedTeams.third.sort((a, b) => {
        const pointsDiff = b.points - a.points;
        if (pointsDiff !== 0) return pointsDiff;
        return b.coefficient - a.coefficient;
    });

    qualifiedTeams.third = qualifiedTeams.third.slice(0, 4).map(team => team.teamId);

    return qualifiedTeams;
};

const calculateFinalStageCoefficient = (teamStats, teamId) => {
    const group = Object.keys(groupsData).find(group => groupsData[group][teamId]);
    if (!group) {
        console.error(`Team ID ${teamId} not found in groupsData`);
        return 0;
    }
    const previousResults = groupsData[group][teamId].results;
    const teamResults = teamStats[group]?.[teamId]?.results || [];
    const results = teamResults.concat(previousResults);
    const fifaIndex = groupsData[group][teamId].fifaIndex;
    return calculateCoefficient(results, fifaIndex);
};

const simulateFinalStageMatch = (teamA, teamB, groupResults) => {
    const teamACoefficient = calculateFinalStageCoefficient(groupResults, teamA);
    const teamBCoefficient = calculateFinalStageCoefficient(groupResults, teamB);
    const { teamAWins, teamBWins } = simulateMatch(teamACoefficient, teamBCoefficient, 5000);

    if (teamAWins === teamBWins) {
        return Math.random() < 0.5 ? 'A' : 'B';
    }
    return teamAWins > teamBWins ? 'A' : 'B';
};

export { calculateTeamStats, getAllGroupPredictions, simulateFinalStageMatch, groupTeams, roundOf16Matches, quarterFinalsMatches, semiFinalsMatches, finalMatch, calculateQualifiedTeams };
