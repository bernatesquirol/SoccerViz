import pandas as pd
competitions = ['England', 'France', 'Germany', 'Spain', 'Italy']

for competition in competitions:
    matches = pd.read_json('matches/matches_{}.json'.format(competition)).set_index('wyId')

    zz = 0
    for line in matches['teamsData']:
        k = list(line.keys())
        if line[k[0]]['score'] == 0 and line[k[1]]['score'] == 0:
            zz += 1
    print(competition, zz, len(matches))


# RESULTS: (Country, goalless games, all games)
# England   32      380
# France    21      380
# Germany   21      306
# Spain     28      380
# Italy     28      380
