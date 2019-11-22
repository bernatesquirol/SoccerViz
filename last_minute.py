import pandas as pd
competitions = ['England', 'France', 'Germany', 'Spain', 'Italy']
minutes = 2

for competition in competitions:
    events = pd.read_json('events/events_{}.json'.format(competition)).set_index('id')
    # events_shot = events[events.eventName == 'Shot']
    # del events

    # last minutes events
    events = events[(events['matchPeriod']=='2H') & (events['eventSec']>(45-minutes)*60)]

    # count last minutes goals
    lmg = 0
    for tags in events['tags']:
        for tag in tags:
            if 101 in tag.values():
                lmg += 1
                break
            if 102 in tag.values():
                lmg += 1
                # print(tag)
                break

    print(competition, lmg)

# RESULTS: (Country, last minutes goals, all games)
# England   168     380     0.442
# France    156     380     0.411
# Germany   130     306     0.424
# Spain     145     380     0.381
# Italy     158     380     0.415

# SO:
# BEST: England
# WORST: Spain
