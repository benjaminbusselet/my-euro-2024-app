const calculatePoints = (results) => {
    return results.reduce((acc, result) => acc + result, 0);
};

const randomNormalPerturbation = (mean = 0, stdDev = 0.02) => { // Réduire l'écart-type à 0.02
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

const calculateWeightedCoefficient = (teamStats, recentPerformanceWeight = 0.6, fifaIndexWeight = 0.4) => {
    const recentPerformance = calculatePoints(teamStats.results);
    const adjustedFifaIndex = (200 - teamStats.fifaIndex) / 200;

    return (recentPerformance * recentPerformanceWeight) + (adjustedFifaIndex * fifaIndexWeight);
};

const simulateMatch = (teamAStats, teamBStats, simulations = 5000) => { // Augmenter à 5000 simulations
    let teamAWins = 0;
    let teamBWins = 0;
    let draws = 0;
    const tolerance = 1.0;

    const teamACoefficient = calculateWeightedCoefficient(teamAStats);
    const teamBCoefficient = calculateWeightedCoefficient(teamBStats);

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
                coefficient: 0 // Ajouter un champ pour le coefficient global
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

        // Calculer le coefficient global pour chaque équipe
        groupTeams[group].forEach(teamId => {
            const teamResults = groupsData[group][teamId].results;
            const teamFifaIndex = groupsData[group][teamId].fifaIndex;
            stats[group][teamId].coefficient = calculateWeightedCoefficient({ results: teamResults, fifaIndex: teamFifaIndex });
        });
    });

    return stats;
};

const getGroupPredictions = (group) => {
    const predictions = [];
    const teams = Object.keys(groupsData[group]);

    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            const teamA = teams[i];
            const teamB = teams[j];
            const teamAStats = { results: groupsData[group][teamA].results, fifaIndex: groupsData[group][teamA].fifaIndex };
            const teamBStats = { results: groupsData[group][teamB].results, fifaIndex: groupsData[group][teamB].fifaIndex };
            const result = simulateMatch(teamAStats, teamBStats);
            predictions.push({ teamA, teamB, result });
        }
    }

    return predictions;
};

const getAllGroupPredictions = () => {
    const allPredictions = {};
    for (const group in groupsData) {
        allPredictions[group] = getGroupPredictions(group);
    }
    return allPredictions;
};

const simulateFinalStageMatch = (teamA, teamB, groupResults) => {
    const teamAStats = { results: groupResults[teamA]?.results || [], fifaIndex: groupResults[teamA]?.fifaIndex || 0 };
    const teamBStats = { results: groupResults[teamB]?.results || [], fifaIndex: groupResults[teamB]?.fifaIndex || 0 };
    const { teamAWins, teamBWins } = simulateMatch(teamAStats, teamBStats, 5000); // Augmenter à 5000 simulations

    // Si les résultats sont égaux, déclarez un gagnant aléatoire
    if (teamAWins === teamBWins) {
        return Math.random() < 0.5 ? 'A' : 'B';
    }
    return teamAWins > teamBWins ? 'A' : 'B';
};

export { calculateTeamStats, groupTeams, getAllGroupPredictions, simulateFinalStageMatch };
