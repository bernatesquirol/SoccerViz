import numpy as np
import altair as alt
import pandas as pd


def get_shots_season(events, shotsList):
    events_shot = events[events.eventName == 'Shot']
    fkShots = ['Free kick shot', 'Penalty']
    events_fk = events[ (events.eventName == 'Free Kick') & (events.subEventName.isin(fkShots) )]
    events_shot['Shots'] = events_shot.apply(lambda _: '1', axis=1)
    events_fk['FreeKicks'] = events_fk.apply(lambda _: '1', axis=1)
    fkShotsMatch = events_fk[['matchId','FreeKicks']].groupby('matchId').count()
    shotsMatch = events_shot[['matchId','Shots']].groupby('matchId').count()
    shots = pd.merge(fkShotsMatch, shotsMatch, on ='matchId')
    shots['Total'] = shots.FreeKicks + shots.Shots
    #print(shots.Total)
    shots_array = np.array(shots.Total)
    shotsList.append([np.mean(shots_array), np.std(shots_array)])
    return

shots = []
countries= ['England', 'France', 'Germany', 'Spain', 'Italy']

#countries = ['France', 'Spain', 'England', 'Germany', 'Italy']
for country in countries:
    print('country:', country)
    events = pd.read_json('events/events_{}.json'.format(country)).set_index('id')
    get_shots_season(events,shots)
    del events

def get_goals_season(matches, goalList):
    goalArray = []
    for i in range(len(matches)):
        scoreString = np.array(matches.label.iloc[i].split())[-3:]
        goalArray.append(int(scoreString[0]) + int(scoreString[2]))
    goalList.append([np.mean(goalArray), np.std(goalArray)])
    return

#countries = ['France', 'Spain', 'England', 'Germany', 'Italy']
goals = []
for country in countries:
    matches = pd.read_json('matches/matches_{}.json'.format(country)).set_index('wyId')
    get_goals_season(matches, goals)
    print('Country')

print(goals, shots)

shots = np.array(shots)
goals = np.array(goals)
shotsGoals = pd.DataFrame({'Country':countries , 'Goals':goals[:,0], 'Shots':shots[:,0]})

base = alt.Chart(shotsGoals,width=500, height=300).transform_calculate(
    yGoalsMin="datum.Goals-datum.GoalsStd",
    yGoalsMax="datum.Goals+datum.GoalsStd",
    yShotsMin="datum.Shots-datum.ShotsStd",
    yShotsMax="datum.Shots+datum.ShotsStd",
)

colorPalette = ['#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4']
#color = colorPalette[-1]
goalsAlt = base.mark_bar(color = colorPalette[-2] ).encode(
    y = alt.Y('Country', sort=countries),
    x = 'Goals:Q',
    #color = 'Country:N',
)

goalsStdAlt = base.mark_errorbar().encode(
    y = alt.Y('Country', sort=countries),
    #y = 'Shots:Q',
    x =alt.X('yGoalsMin:Q', axis=alt.Axis(title='')),
    x2 = 'yGoalsMax:Q',
    #color = 'Country:N',
)


shotsAlt = base.mark_bar( color = colorPalette[-1] ).encode(
    y= alt.Y('Country', sort=countries),
    x=alt.X('Shots:Q', axis=alt.Axis(title='Shots and goals')),
    #color = 'Country:N'
)

shotsStdAlt = base.mark_errorbar().encode(
    y = alt.Y('Country', sort=countries),
    x = alt.X('yShotsMin:Q',axis=alt.Axis(title='') ),
    x2 = 'yShotsMax:Q'
)

alt.layer( shotsAlt, goalsAlt, goalsStdAlt, shotsStdAlt
).resolve_scale('independent').serve()