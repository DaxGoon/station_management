class Data {
    data: Array<any>;
    totalChargingStations: Array<any>;
    totalChargingPower: number;
}

class Station {
    constructor(id: number, company: string, stationType: string, state: string, maxPower: number) {

    }

}

export function parse(instruction: string): Data {
    const uniformCaseInstruction = instruction.toUpperCase();
    if (!uniformCaseInstruction.startsWith('BEGIN') || !instruction.endsWith('END')) return null;

    // FIXME: This is a hack to get the sample date.
    //  It should be removed and replaced by a real database query.
    const data: Data = {
        data: sampleStationData.data,
        totalChargingStations: [],
        totalChargingPower: 0,
    };

    const lines = uniformCaseInstruction.split('\n');
    console.log('COMMANDS: ',lines);
    for (const line of lines) {
        const parts = line.split(' ');
        if (parts.length < 4) continue;

        const step = line;
        const timestamp = Date.now();
        const companies = [];
        let totalChargingStations = data.totalChargingStations;
        let totalChargingPower = data.totalChargingPower;

        const command = parts[1];
        const stationId = parts[2];
        const time = parts[3];

        if (command === 'Start') {
            if (stationId === 'all') {
                sampleStationData.data.forEach((station) => {
                    if (station.state === 'not_charging') {
                        station.state = 'charging';
                        totalChargingStations.push(station);
                        totalChargingPower += station.maxPower;
                    }
                }
                );
            } else {
                const id = parseInt(stationId);
                const company = parts[4];
                const stationType = parts[5];
                const state = 'charging';
                const maxPower = parseInt(parts[6], 10);

                const station = new Station(id, company, stationType, state, maxPower);
                companies.push({
                    id: company,
                    chargingStations: [stationId],
                    chargingPower: maxPower,
                });
                totalChargingStations.push(stationId);
                totalChargingPower += maxPower;
            }
        } else if (command === 'Stop') {
            if (stationId === 'all') {
                sampleStationData.data.forEach((station) => {
                    if (station.state === 'charging') {
                        station.state = 'not_charging';
                        totalChargingStations.splice(totalChargingStations.indexOf(station.id), 1);
                        totalChargingPower -= station.maxPower;
                    }
                }
                );
            } else {
                const id = parseInt(stationId);
                const company = parts[4];
                const stationType = parts[5];
                const state = 'not_charging';
                const maxPower = parseInt(parts[6], 10);

                const station = new Station(id, company, stationType, state, maxPower);
                companies.push({
                    id: company,
                    chargingStations: [stationId],
                    chargingPower: maxPower,
                });
                totalChargingStations.splice(totalChargingStations.indexOf(stationId), 1);
                totalChargingPower -= maxPower;
            }
        } else if (command === 'Wait') {
            continue;
        } else {
            continue;
        }

        data.data.push({
            step,
            timestamp,
            companies,
            totalChargingStations,
            totalChargingPower,
        });
    }

    return data;
}

const sampleStationData = {
    "data": [
        {
            "id": 1,
            "company": "1",
            "stationType": "Station Type 9",
            "state": "charging",
            "maxPower": 10
        },
        {
            "id": 2,
            "company": "2",
            "stationType": "Station Type 2",
            "state": "not_charging",
            "maxPower": 100
        },
        {
            "id": 3,
            "company": "3",
            "stationType": "Station Type 3",
            "state": "charging",
            "maxPower": 80
        },
        {
            "id": 4,
            "company": "4",
            "stationType": "Station Type 23",
            "state": "not_charging",
            "maxPower": 50
        }
    ],
};
