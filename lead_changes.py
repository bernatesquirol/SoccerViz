import pandas as pd
import numpy as np

competitions = ['England', 'France', 'Germany', 'Spain', 'Italy']


def get_status(curr_dict):
    t_arr = list(curr_dict.values())
    if t_arr[0] > t_arr[1]:
        return t_arr[0]
    elif t_arr[0] < t_arr[1]:
        return t_arr[1]
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

        # first_half = mat_events[(mat_events['matchPeriod'] == '1H')]
        for idx, tags in enumerate(mat_events['tags']):
            for tag in tags:
                if 101 in tag.values():
                    td[mat_events.iloc[idx]['teamId']] += 1
                    break
                if 102 in tag.values():
                    td[mat_events.iloc[idx]['teamId']] -= 1
                    # print(tag)
                    break
            if current_status != get_status(td):
                status_changes += 1
            current_status = get_status(td)

        # second_half = mat_events[(mat_events['matchPeriod'] == '2H')]
        # print(status_changes)

    print(competition, status_changes, len(mat_id), status_changes/len(mat_id))


# RESULTS: (Country, status changes, all games)
# England   2012    380    5.29
# France    2045    380    5.38
# Germany   1691    306    5.52
# Spain     2026    380    5.33
# Italy     2006    380    5.27

# SO:
# BEST: Germany
# WORST: Italy
