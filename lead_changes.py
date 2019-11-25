import pandas as pd
import numpy as np

competitions = ['England', 'France', 'Germany', 'Spain', 'Italy']


def get_status(curr_dict):
    t_arr = list(curr_dict.values())
    if t_arr[0] > t_arr[1]:
        return 1
    elif t_arr[0] < t_arr[1]:
        return -1
    return 0


for competition in competitions:
    matches = pd.read_json('matches/matches_{}.json'.format(competition)).set_index('wyId')
    mat_id = np.array(matches.index)
    del matches

    events = pd.read_json('events/events_{}.json'.format(competition)).set_index('id')
    status_changes = 0

    for matchId in mat_id:
        mat_events = events[(events['matchId'] == matchId)]
        teams = mat_events['teamId'].unique()
        td = {teams[0]: 0, teams[1]: 0}
        current_status = 0  # 0 is draw
        last_time = -20.0
        sc = 0

        # first_half = mat_events[(mat_events['matchPeriod'] == '1H')]
        for idx, event in mat_events.iterrows():
            tags = event['tags']
            if event['eventSec'] < last_time + 10:
                continue
            for tag in tags:
                if 101 in tag.values():
                    td[event['teamId']] += 1
                    last_time = event['eventSec']
                    break
                if 102 in tag.values():
                    td[event['teamId']] -= 1
                    last_time = event['eventSec']
                    # print(tag)
                    break
            if current_status != get_status(td):
                status_changes += 1
                sc += 1
            current_status = get_status(td)

        # second_half = mat_events[(mat_events['matchPeriod'] == '2H')]
        # print(matchId, td, sc)

    print(competition, status_changes, len(mat_id), status_changes/len(mat_id))


# RESULTS WRONG!!!!: (Country, status changes, all games)
# England   2012    380    5.29
# France    2045    380    5.38
# Germany   1691    306    5.52
# Spain     2026    380    5.33
# Italy     2006    380    5.27

# RESULTS: (Country, status changes, all games, changes in avg. game)
# England   523     380     1.37
# France    570     380     1.5
# Germany   456     306     1.49
# Spain     519     380     1.36
# Italy     549     380     1.44

# SO:
# BEST: France
# WORST: Spain


