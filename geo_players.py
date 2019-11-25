import altair as alt
import geopandas as gpd
import pandas as pd
import numpy as np

players = pd.read_json('players.json').set_index('wyId')

# alt.renderers.enable('notebook')

world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

world.at[21, 'iso_a3'] = 'NOR'
world.at[43, 'iso_a3'] = 'FRA'

# world[world['iso_a3'] == '-99']

europe = world[world.continent == 'Europe']
europe = europe.drop(europe[europe.name == 'Russia'].index)


# players.passportArea.values[:3]

def change_fckng_polygons(name='France', pos=1):
    global europe
    fr = europe[europe['name'] == name]
    pol = fr['geometry'].iloc[0][pos]
    europe.at[europe.index[europe['name'] == name], 'geometry'] = pol


change_fckng_polygons()
change_fckng_polygons('Norway')

countries = np.array([c['alpha3code'] for c in players.passportArea.values], dtype=np.object)
# np.count_nonzero(~np.isnan(countries))
# countries.dtype
pl_country = pd.DataFrame(data=countries, columns=['alpha3code'])
type(pl_country)
unique, counts = np.unique(pl_country, return_counts=True)
bla = dict(zip(unique, counts))
europe['num_players'] = np.array([bla[key] if key in bla else 0 for key in europe['iso_a3']])
# players.passportArea.values[:3]


data = alt.InlineData(values=europe.__geo_interface__,  # geopandas to geojson
                      # root object type is "FeatureCollection" but we need its features
                      format=alt.DataFormat(property='features', type='json'))

selection = alt.selection_interval(bind='scales')
# alt.data_transformers.enable('json')
map = alt.Chart(data).mark_geoshape(
    # x=-150.2,
    # x2=-200,
    # y=-100,
    clip=True,
    stroke='black'
).encode(
    # color='properties.num_players:Q',  # GeoDataFrame fields are accessible through a "properties" object
    # color=alt.Color('properties.num_players:Q', scale=alt.Scale(domain=[0, 500], range=['#ffffff', '#11efff'])),
    color=alt.Color('properties.num_players:Q', scale=alt.Scale(scheme='teals')),
    tooltip=['properties.name:N', 'properties.num_players:Q']
).properties(
    width=250,
    height=300
)


eu_n = sum(europe['num_players'])
spa_n = europe.at[europe[europe.name == 'Spain'].index[0], 'num_players']
all_n = sum(counts)
rest_eu_n = eu_n - spa_n
rest_n = all_n - eu_n
df_all = pd.DataFrame({'number': [spa_n, rest_eu_n, rest_n],
                     'from': ['Spain', 'Rest EU', 'Rest of the world']})
# europe[europe.name == 'Spain'].index[0]
bar = alt.Chart(df_all).mark_bar(color='#4da5a4').encode(
    x='number:Q',
    y='from:O'
).properties(
    width=250
)
# bar.serve()
alt.vconcat(
    map, bar
).resolve_legend(
    color='independent',
    size='independent'
).serve()
