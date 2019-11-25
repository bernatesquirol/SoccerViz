import pandas as pd
import numpy as np
import math
import altair as alt
from collections import ChainMap


ROUNDS_IN_ONE_CELL = 1
AGGREGATE = True


matches = pd.read_json('matches/matches_{}.json'.format('Spain')).set_index('wyId')

def get_goals_per_game(teamsData):
    keys_team_data = list(teamsData.keys())
    return {keys_team_data[0]:teamsData[keys_team_data[0]]['score'],keys_team_data[1]:teamsData[keys_team_data[1]]['score']}

def get_points_per_score(teamsData): #{'3783': 2, '3767': 1}
    keys_team_data = list(teamsData.keys())
    score_match = get_goals_per_game(teamsData)
    if score_match[keys_team_data[0]]==score_match[keys_team_data[1]]:
        return {keys_team_data[0]:1,keys_team_data[1]:1}
    if score_match[keys_team_data[0]]>score_match[keys_team_data[1]]:
        return {keys_team_data[0]:3,keys_team_data[1]:0}
    if score_match[keys_team_data[0]]<score_match[keys_team_data[1]]:
        return {keys_team_data[0]:0,keys_team_data[1]:3}

def get_points_round(round_matches):
    matches_selected = round_matches.sort_values('gameweek')
    dicts = matches_selected.apply(lambda x: get_points_per_score(x['teamsData']), axis=1)
    return dict(ChainMap(*list(dicts)))

def get_points_league(matches):
    all_rounds = {}
    for gameweek, matches_played in matches.groupby('gameweek'):
        all_rounds[gameweek]=get_points_round(matches_played)
    return pd.DataFrame.from_dict(all_rounds)

def get_points_aggregated_by_round(matches):
    points = get_points_league(matches)
    for round_i in range(2,len(points.columns)+1):
        points[round_i]=points[[round_i-1,round_i]].sum(axis=1)
    return points

def get_classification_by_round(matches):
    points_agg = get_points_aggregated_by_round(matches)
    return points_agg.rank(method='first',ascending=False).astype(int)


classification = get_classification_by_round(matches)
classification_transposed = classification.transpose()
position_changes = np.zeros((math.ceil(classification_transposed.shape[0] / ROUNDS_IN_ONE_CELL), len(classification)))
for timerange in range(position_changes.shape[0]):
    for team in classification.index:
        min_i = max(0, timerange * ROUNDS_IN_ONE_CELL - 1)

        max_i = (timerange + 1) * ROUNDS_IN_ONE_CELL
        if max_i >= classification_transposed.shape[0]:
            max_i = classification_transposed.shape[0] - 1

        prev_val = None
        for val in classification_transposed.iloc[min_i:max_i][team].values:
            if prev_val is not None and val != prev_val:
                if AGGREGATE:
                    position_changes[timerange:, val - 1] += 1
                else:
                    position_changes[timerange][prev_val - 1] += 1
            prev_val = val


x, y = np.meshgrid(range(1, position_changes.shape[0]+1), range(1, position_changes.shape[1]+1))
# z = position_changes

# Convert this grid to columnar data expected by Altair
source = pd.DataFrame({'Round': x.flat,
                       'Position': y.flat,
                       'Changes': position_changes.T.flat})

# alt.renderers.enable('notebook')
alt.Chart(source).mark_rect().encode(
    x='Round:O',
    y='Position:O',
    # color='Changes:Q',
    color=alt.Color('Changes:Q', scale=alt.Scale(scheme='purples')),
    tooltip='Changes:Q'
).properties(
    width=500,
    height=500
).serve()

