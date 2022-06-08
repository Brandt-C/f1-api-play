let form  = document.querySelector('#dform');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = event.path[0][0].value
    let round = event.path[0][1].value
    let results = event.path[0][2].value
    console.log(season, round, results);
    loadTable(season, round, results);
    form.reset();
});


let getTable = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    if (response.status == 200) {
        return response.data
    }
    return null
}

let loadTable = async (season, round, results) => {
    let data = await getTable(season, round);
    if (data == null) {
        console.log('error with API request')
        return
    }
    console.log(data)
    for (i=0; i<results-1; i++) {
    let new_row = `
    <tr>
        <th scope="row">${i+1}</th>
        <td id="name1" colspan="2" class="table-active">${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName} ${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName}</td>
        <td id="nationality1">${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality}</td>
        <td id="sponsor1">${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].constructorId}</td>
        <td id="points1">${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points}</td>
    </tr>`;
    document.getElementById('drivertable').insertAdjacentHTML('beforeend', new_row);
}
}

let clearTable = () => {
    document.getElementById('drivertable').innerHTML='';
}